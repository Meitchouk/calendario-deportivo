# Calendario Deportivo

Aplicación interna para organizar eventos deportivos en la zona horaria `America/Managua`.

## Inicio local

1. Copie `.env.example` a `.env.local` y complete las variables.
2. Instale dependencias: `pnpm install`.
3. Ejecute `pnpm dev`.

## Firebase

Use Firestore con las colecciones `settings`, `enabledLeagues`, `manualEvents`, `sportsCache` y `syncMetadata`. Convierta el JSON de una cuenta de servicio a Base64 y guárdelo únicamente como `FIREBASE_SERVICE_ACCOUNT_BASE64`. No suba el JSON ni `.env.local` al repositorio.

## API-Sports y caché

Defina `API_SPORTS_KEY` sólo en el entorno del servidor. Los módulos de Firebase Admin y API-Sports son `server-only`; ninguna clave llega al navegador. La capa `services/sports` es el punto de integración para los adapters/proveedores y debe persistir respuestas en `sportsCache` antes de consultas posteriores.

## Despliegue en Vercel

Importe el repositorio en Vercel y añada las variables de `.env.example` en **Project Settings → Environment Variables**. Después ejecute `pnpm build` como validación antes de desplegar.
