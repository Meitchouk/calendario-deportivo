import "server-only";
import { cert,getApps,initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
function app(){if(getApps().length)return getApps()[0];const encoded=process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;if(!encoded)throw new Error("Firebase no está configurado. Añade FIREBASE_SERVICE_ACCOUNT_BASE64.");const serviceAccount=JSON.parse(Buffer.from(encoded,"base64").toString("utf8"));return initializeApp({credential:cert(serviceAccount),storageBucket:process.env.FIREBASE_STORAGE_BUCKET});}
export const db=()=>getFirestore(app());
