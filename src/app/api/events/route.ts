import { NextRequest,NextResponse } from "next/server";
import { getEvents } from "@/services/sports/event-service";
export async function GET(request:NextRequest){const q=request.nextUrl.searchParams;const from=q.get("from"),to=q.get("to");if(!from||!to)return NextResponse.json({error:"from y to son requeridos"},{status:400});return NextResponse.json(await getEvents({from,to,sport:q.get("sport")??undefined,league:q.get("league")??undefined,region:q.get("region")??undefined}));}
