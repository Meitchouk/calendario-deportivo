import { SportsWorkspace } from "@/components/calendar/sports-workspace";
import { getEvents } from "@/services/sports/event-service";
import { getMonthRange } from "@/lib/dates";
export default async function Home({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) { const p=await searchParams,month=typeof p.month==="string"?p.month:undefined,sport=typeof p.sport==="string"?p.sport:undefined,league=typeof p.league==="string"?p.league:undefined,region=typeof p.region==="string"?p.region:undefined,{from,to,date}=getMonthRange(month); return <SportsWorkspace events={await getEvents({from,to,sport,league,region})} initialMonth={date.toISOString()}/>; }
