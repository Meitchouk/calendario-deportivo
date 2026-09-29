import { NextRequest,NextResponse } from "next/server";
import { LEAGUES } from "@/lib/sports-config";
export async function GET(request:NextRequest){const query=(request.nextUrl.searchParams.get("q")??"").toLowerCase();return NextResponse.json(LEAGUES.filter(x=>x.toLowerCase().includes(query)).map((name,index)=>({leagueId:String(index+1),name})));}
