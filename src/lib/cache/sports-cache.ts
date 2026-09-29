import "server-only";
import { createHash } from "node:crypto";
import { db } from "@/lib/firebase/admin";

export type CacheKind = "events" | "leagues" | "seasons";
type CachedDocument<T> = { value:T; fetchedAt:string; expiresAt:string };

export function cacheTtlMs(kind:CacheKind, from?:string, to?:string, now=new Date()):number {
  if(kind!=="events") return 7*24*60*60*1000;
  const today=now.toISOString().slice(0,10);
  if(from===today || to===today) return 30*60*1000;
  if(to && to<today) return 24*60*60*1000;
  return 6*60*60*1000;
}
export function sportsCacheKey(parts:Record<string,string|undefined>):string { return createHash("sha256").update(Object.entries(parts).filter(([,v])=>v).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`${k}=${v}`).join("&")).digest("hex"); }

export async function readCache<T>(key:string):Promise<CachedDocument<T>|null>{const snap=await db().collection("sportsCache").doc(key).get();if(!snap.exists)return null;const value=snap.data() as CachedDocument<T>;return value;}
export async function getOrFetch<T>(input:{key:string;kind:CacheKind;from?:string;to?:string;metadata:Record<string,string>;fetcher:()=>Promise<T>}):Promise<{value:T;cached:boolean;stale:boolean;fetchedAt:string}>{
 const cached=await readCache<T>(input.key); const now=new Date();
 if(cached && new Date(cached.expiresAt)>now)return{value:cached.value,cached:true,stale:false,fetchedAt:cached.fetchedAt};
 try{const value=await input.fetcher();const fetchedAt=now.toISOString(),expiresAt=new Date(now.getTime()+cacheTtlMs(input.kind,input.from,input.to,now)).toISOString();await db().collection("sportsCache").doc(input.key).set({key:input.key,...input.metadata,value,fetchedAt,expiresAt},{merge:true});return{value,cached:false,stale:false,fetchedAt};}catch(error){if(cached)return{value:cached.value,cached:true,stale:true,fetchedAt:cached.fetchedAt};throw error;}
}
