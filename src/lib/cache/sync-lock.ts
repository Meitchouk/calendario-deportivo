import "server-only";
import { db } from "@/lib/firebase/admin";
const LOCK_MS=2*60*1000;
export async function acquireSyncLock(){const ref=db().collection("syncMetadata").doc("calendar");return db().runTransaction(async transaction=>{const current=await transaction.get(ref),data=current.data() as {lockedUntil?:string}|undefined,now=new Date();if(data?.lockedUntil&&new Date(data.lockedUntil)>now)return false;transaction.set(ref,{lockedUntil:new Date(now.getTime()+LOCK_MS).toISOString(),lastStartedAt:now.toISOString()},{merge:true});return true;});}
export async function finishSyncLock(status:"success"|"failed"){await db().collection("syncMetadata").doc("calendar").set({lockedUntil:null,lastSyncAt:new Date().toISOString(),lastStatus:status},{merge:true});}
