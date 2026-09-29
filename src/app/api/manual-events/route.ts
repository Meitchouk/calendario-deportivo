import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/firebase/admin";
export async function POST(request:NextRequest){try{const input=await request.json() as Record<string,unknown>;const now=new Date().toISOString();const ref=await db().collection("manualEvents").add({...input,source:"manual",timezone:"America/Managua",createdAt:now,updatedAt:now});return NextResponse.json({id:ref.id},{status:201});}catch(error){return NextResponse.json({error:error instanceof Error?error.message:"No se pudo guardar"},{status:503})}}
