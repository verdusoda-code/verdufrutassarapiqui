# Verdufrutas Sarapiquí

Primera versión del sitio mayorista de Verdufrutas Sarapiquí, una comercializadora de frutas y verduras para negocios e instituciones de Costa Rica. Incluye un catálogo de demostración, un carrito editable y un resumen de pedido; no realiza pagos ni envía pedidos reales.

## Tecnologías

- TanStack Start y TanStack Router, con renderizado del servidor y carga de catálogo mediante un loader.
- React 19 y TypeScript para la interfaz y las reglas de cantidades y totales.
- Tailwind CSS 4 y estilos propios con una identidad verde, natural y profesional.
- Radix UI para diálogos accesibles, Lucide para iconos y Sonner para avisos.
- Netlify y Netlify Image CDN para publicación e imágenes responsivas.

## Desarrollo local

Requisitos: Node.js 22 o posterior, pnpm y Netlify CLI. El proyecto está configurado para publicarse con la integración de TanStack Start de Netlify.

```bash
pnpm install
netlify dev --port 8889
```

Abre `http://localhost:8889`. Netlify Dev incluye la emulación del CDN de imágenes. El despliegue automático instala dependencias y compila el sitio.

## Funciones de esta versión

El catálogo contiene los ocho productos, códigos, precios y unidades de ejemplo solicitados. Permite buscar sin distinguir tildes o mayúsculas, filtrar por categoría e introducir cantidades. Las ventas por kilogramo admiten incrementos de 0,1; las ventas por unidad requieren enteros. El carrito agrupa productos repetidos, permite editar o eliminar y calcula subtotales y total.

El resumen solicita negocio, persona encargada, WhatsApp, dirección y notas. El botón de WhatsApp valida el formulario y muestra el mensaje de demostración, sin abrir WhatsApp ni enviar datos. El botón de inicio de sesión muestra una explicación honesta de las cuentas futuras, no un formulario de acceso ficticio.

El carrito y los datos del formulario solo existen mientras la página está abierta; se pierden al recargar. No se conecta ni provisiona una base de datos, no se habilita autenticación y no se almacenan datos personales. Tampoco se implementan pagos, facturación electrónica ni administración privada.

## Estructura y ampliaciones

- `src/routes/index.tsx`: página principal, navegación y composición.
- `src/domain/`: contratos del catálogo, tipos del pedido, estados futuros y cálculo de cantidades y totales.
- `src/data/demo-catalog.ts`: adaptador reemplazable de datos de ejemplo; no es almacenamiento persistente.
- `src/hooks/use-cart.ts`: estado transitorio del carrito con un reducer puro.
- `src/components/`: tarjetas, controles de cantidad y flujo de pedido, separados de los datos.
- `public/img/`: fotografías de demostración generadas para el sitio, guardadas en WebP y servidas mediante Image CDN.
- `docs/architecture.md`: límites de esta versión y ruta de ampliación para cuentas, administración y pedidos privados.

## Imágenes

Las imágenes son ilustrativas y no representan inventario real. Las fotografías generadas y optimizadas ya están incluidas; el sitio no usa IA en tiempo de ejecución. `scripts/generate-assets.mjs` conserva el proceso opcional de generación con Netlify AI Gateway y el SDK oficial de Google. Ejecutarlo requiere las variables de AI Gateway y las herramientas `identify` y `convert` de ImageMagick; genera nuevas imágenes, consume créditos y reemplaza los assets actuales. No se ejecuta durante el despliegue.
