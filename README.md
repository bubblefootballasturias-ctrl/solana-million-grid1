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
- npm run test — Ejecuta tests
- npm run lint — Ejecuta linter

Tests
- Describir cómo ejecutar pruebas unitarias e integración. Para Solana, indicar si se usa solana-test-validator o Anchor.

Despliegue
- Instrucciones para desplegar programas on-chain o frontends.

Contribuir
- Añadir CONTRIBUTING.md con guidelines para PRs, estilo de commits, revisión de código.

Licencia
- Añade una LICENSE a tu gusto (MIT recomendado).