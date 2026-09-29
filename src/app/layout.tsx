import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"Calendario Deportivo",description:"Eventos deportivos en America/Managua"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
