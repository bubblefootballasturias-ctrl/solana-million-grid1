```md
# solana-million-grid1

Proyecto: Million Grid on Solana — los usuarios compran casillas y suben imágenes que cubren las casillas.

Requisitos
- Node 18+
- npm o yarn
- Cuenta en nft.storage (API key)
- Cuenta en Supabase (URL + service_role key) — o puedes usar tu propia BBDD

Variables de entorno (.env)
- NEXT_PUBLIC_NFT_STORAGE_KEY=...
- SUPABASE_URL=...
- SUPABASE_SERVICE_ROLE_KEY=...
- NEXT_PUBLIC_SUPABASE_ANON_KEY=...
- RECEIVER_PUBLIC_KEY= (wallet donde irán los pagos)
- NEXT_PUBLIC_NETWORK=devnet | mainnet-beta
- NEXT_PUBLIC_PRICE_PER_SQUARE=0.01

Instalación
1. Clonar:
   git clone https://github.com/bubblefootballasturias-ctrl/solana-million-grid1.git
2. Instalar dependencias:
   cd solana-million-grid1
   npm ci

Configuración
- Copia el archivo de ejemplo .env.example a .env y ajusta las variables
- No subas keypairs ni .env al repositorio

Scripts (ejemplos)
- npm run dev — Inicia la app
- npm run build — Construye

Despliegue (resumen)
- Añade las variables de entorno en Vercel o tu hosting.
- Crea la tabla purchases en Supabase (usa db/create_table.sql).

Licencia
- Añade una LICENSE (p. ej. MIT) si quieres.
```
