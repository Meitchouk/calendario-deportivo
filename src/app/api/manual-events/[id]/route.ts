import { NextRequest,NextResponse } from "next/server";
import { db } from "@/lib/firebase/admin";
export async function PUT(request:NextRequest,{params}:{params:Promise<{id:string}>}){try{const {id}=await params;await db().collection("manualEvents").doc(id).update({...await request.json(),updatedAt:new Date().toISOString()});return new NextResponse(null,{status:204});}catch{return NextResponse.json({error:"No se pudo actualizar"},{status:503})}}
export async function DELETE(_:NextRequest,{params}:{params:Promise<{id:string}>}){try{const {id}=await params;await db().collection("manualEvents").doc(id).delete();return new NextResponse(null,{status:204});}catch{return NextResponse.json({error:"No se pudo eliminar"},{status:503})}}
