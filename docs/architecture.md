# Arquitectura y ampliación

## Alcance actual

La primera versión es una experiencia de pedidos empresariales, no una tienda para consumidores. Las rutas públicas, el catálogo, el carrito y el resumen funcionan sin autenticación. No hay registros de clientes, datos persistentes, panel privado, envío real por WhatsApp, cobro ni emisión de facturas.

La información del formulario permanece exclusivamente en estado React de la página abierta. No se envía al servidor ni a un servicio externo. Los datos de ejemplo del catálogo se incluyen en el código porque son fixtures de demostración, no una solución de persistencia ni un supuesto panel administrativo.

## Separación de responsabilidades

`src/domain/catalog.ts` define `Product`, categorías, unidades y el contrato asíncrono `CatalogRepository`. El loader de la ruta obtiene productos a través del adaptador `demoCatalogRepository`; las tarjetas reciben datos y una acción, no conocen el origen del catálogo. Para conectar inventario real, se debe crear un adaptador exclusivamente del servidor y llamarlo desde una función del servidor de TanStack Start. El loader debe invocar esa función, porque los loaders también se ejecutan en el cliente. Nunca se deben importar credenciales o consultas de base de datos directamente en un loader o un componente del cliente.

`src/domain/order.ts` define datos del negocio, líneas de carrito, cantidades válidas, subtotales, total y composición del mensaje. `useCart` conserva solo estado de interfaz. `OrderDialog` coordina carrito, datos y vista previa. El formato de mensaje está separado de la interacción visual para que su envío real pueda integrarse sin reescribir el catálogo.

Las fotografías se referencian mediante `src/lib/images.ts`; todos los componentes utilizan Netlify Image CDN. Los colores y parámetros visuales están centralizados en `src/styles.css`, para evitar estilos de marca dispersos.

## Cuentas y seguridad, en una fase posterior

Se debe integrar Netlify Identity mediante `@netlify/identity` para registro, inicio de sesión, recuperación y sesiones seguras. Las contraseñas deben ser gestionadas por el proveedor, nunca guardadas en tablas propias ni en almacenamiento del navegador. La activación de Identity y sus formularios se reserva para esa fase.

Una cuenta de negocio debe relacionarse con identidades verificadas mediante una membresía; si un negocio tiene varias personas encargadas, la membresía permite ampliar sin mezclar usuarios y empresas. El servidor debe comprobar identidad y permisos en cada lectura o escritura. Ocultar botones o proteger solo la navegación no constituye autorización.

El historial de pedidos debe consultarse siempre por el identificador de negocio obtenido de la sesión, no por un identificador de cliente suministrado libremente por el navegador. El administrador necesita un rol verificado del servidor y acceso privado a las acciones de inventario, pedidos y configuración. Las credenciales y los roles privilegiados nunca deben quedar en el catálogo público.

## Modelo de datos propuesto, no implementado

Cuando se autorice persistencia, se debe usar Netlify Database con `@netlify/database` y Drizzle ORM. El esquema debe definirse en `db/schema.ts` con las migraciones correspondientes. No existe ni se aplica un esquema en esta versión.

| Entidad | Responsabilidad futura |
| --- | --- |
| Negocios | Nombre, dirección, contactos y relación con membresías verificadas. |
| Membresías | Identidad del proveedor, negocio asociado y permisos. |
| Productos | Identificador estable, código único, nombre, categoría, unidad, precio, imagen y estado activo. |
| Pedidos | Negocio propietario, datos de contacto al confirmar, fecha, estado, total confirmado y notas. |
| Líneas de pedido | Producto y copias del nombre, código, unidad y precio vigente al confirmar, junto con cantidad y subtotal. |
| Historial de estados | Pedido, estado anterior y nuevo, fecha e identidad de quien realizó el cambio. |
| Configuración | Parámetros de marca y contacto explícitamente permitidos y validados. |

Los importes deben representarse con precisión decimal o en unidades monetarias menores, no como flotantes sin control. Al recibir un pedido real, el servidor debe volver a leer precios y disponibilidad, validar cantidades y calcular el total. Las cifras del navegador son solo informativas. Pedido y líneas deben registrarse en una transacción con protección contra envíos duplicados.

Las líneas deben conservar precios y nombres originales para que editar el catálogo no altere pedidos históricos. Desactivar un producto retira su disponibilidad sin borrar la referencia de pedidos anteriores. Las futuras fotografías subidas se deben almacenar en Netlify Blobs y mostrar mediante el CDN, mientras que los registros de productos pertenecen a Netlify Database.

## Administración y estadísticas

El panel privado debe permitir agregar, editar y desactivar productos, actualizar precios, fotografías, unidades y códigos, gestionar todos los pedidos y modificar su estado. Los estados previstos ya están expresados en el tipo `OrderStatus`: Pendiente, Confirmado, Preparando, Listo, Entregado y Cancelado. Las transiciones y sus permisos deben definirse y validarse en el servidor, con un registro de cambios.

Las estadísticas de pedidos, clientes frecuentes y productos más solicitados deben derivarse de consultas sobre pedidos y líneas; no se deben presentar cifras inventadas ni mantener contadores desconectados del historial. La configuración visual futura debe limitarse a parámetros de marca seguros, no a HTML o scripts arbitrarios.

## Pedidos por WhatsApp

Antes de activar el envío se necesita el número comercial de destino. El formato del mensaje de prueba ya incluye negocio, persona encargada, WhatsApp, dirección, productos, códigos, cantidades, subtotales, total y notas. La conexión real debe distinguir preparar un mensaje, abrir WhatsApp y confirmar la recepción de un pedido: abrir un enlace no acredita su entrega.

La factura oficial continúa siendo un proceso externo realizado por el negocio. No se contempla facturación electrónica automática ni pagos en línea.

## Orden de ampliación

1. Acordar datos de contacto, políticas comerciales y datos reales del catálogo.
2. Habilitar autenticación segura y membresías de negocios.
3. Añadir el esquema, repositorios del servidor y autorización por negocio.
4. Integrar confirmación persistente del pedido e historial privado.
5. Crear administración protegida de productos, pedidos y estados.
6. Habilitar WhatsApp real, estadísticas y configuración de marca.

Cada fase debe agregar sus controles del servidor y pruebas de permisos antes de presentarse como operativa. No hay rutas privadas ni controles administrativos ficticios en la primera versión.
