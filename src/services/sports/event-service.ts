import type { SportEvent } from "@/types/sports";
import { APP_TIMEZONE } from "@/lib/dates";
const sample:SportEvent[]=[
 {id:"demo-1",sport:"football",leagueName:"Liga Primera Nicaragua",country:"Nicaragua",title:"Diriangén vs Real Estelí",homeName:"Diriangén",awayName:"Real Estelí",startAt:"2026-10-03T00:00:00Z",timezone:APP_TIMEZONE,status:"scheduled",source:"manual"},
 {id:"demo-2",sport:"football",leagueName:"Champions League",country:"International",title:"Real Madrid vs Liverpool",homeName:"Real Madrid",awayName:"Liverpool",startAt:"2026-10-14T19:00:00Z",timezone:APP_TIMEZONE,status:"scheduled",source:"api-sports"},
 {id:"demo-3",sport:"baseball",leagueName:"CNBS / Pomares",country:"Nicaragua",title:"Boer vs León",homeName:"Boer",awayName:"León",startAt:"2026-10-09T00:30:00Z",timezone:APP_TIMEZONE,status:"scheduled",source:"manual"},
 {id:"demo-4",sport:"basketball",leagueName:"LSB",country:"Nicaragua",title:"Real Estelí vs Granada",homeName:"Real Estelí",awayName:"Granada",startAt:"2026-10-18T00:30:00Z",timezone:APP_TIMEZONE,status:"scheduled",source:"manual"},
 {id:"demo-5",sport:"nfl",leagueName:"NFL",country:"International",title:"Steelers vs Browns",homeName:"Steelers",awayName:"Browns",startAt:"2026-10-19T00:15:00Z",timezone:APP_TIMEZONE,status:"scheduled",source:"api-sports"},
 {id:"demo-6",sport:"ufc",leagueName:"UFC Fight Night",country:"International",title:"UFC Fight Night",homeName:"Peleador por confirmar",awayName:"",startAt:"2026-10-25T02:00:00Z",timezone:APP_TIMEZONE,status:"scheduled",source:"api-sports"},
];
export async function getEvents(filters:{from:string;to:string;sport?:string;league?:string;region?:string}):Promise<SportEvent[]>{
 const matches=sample.filter(e=>(!filters.sport||e.sport===filters.sport)&&(!filters.league||e.leagueId===filters.league||e.leagueName===filters.league)&&(!filters.region||filters.region==="all"||(filters.region==="nicaragua"?e.country==="Nicaragua":e.country!=="Nicaragua")));
 return matches;
}
