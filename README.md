# DEUNA_VECI — educación financiera y comercio de barrio con IA

DEUNA_VECI (Mi Veci) es una aplicación móvil de demostración que reúne una experiencia para clientes y herramientas para comercios locales. El proyecto explora pagos mediante QR, programas de fidelidad y cashback, y una experiencia de apoyo educativo con inteligencia artificial.

> **Estado y alcance:** el flujo QR, los saldos y las compras que se muestran en la aplicación son demostrativos. El QR identifica un comercio y permite probar el recorrido de la interfaz; no procesa dinero real. La información de recompensas se guarda localmente en el dispositivo. No debe interpretarse la aplicación como un sistema de pagos o contabilidad en producción.

## Funcionalidades integradas

### Experiencia de cliente

- Inicio con acceso a perfil, beneficios, billetera y al flujo de pago de demostración.
- Escaneo de códigos QR de comercios Mi Veci con la cámara del dispositivo. La app solicita permiso cuando hace falta, valida que el QR corresponda a un comercio conocido y evita procesar repetidamente el mismo escaneo.
- Confirmación de una compra de prueba y actualización del avance de fidelidad del comercio.
- Consulta de beneficios, progreso y movimientos/saldo de demostración.
- Experiencia de chat educativo con IA descrita para el proyecto, conectada con la API de Google Gemini. Las respuestas son informativas y pueden ser inexactas; no sustituyen asesoría financiera profesional.

### Herramientas para comercios

- Panel del negocio con accesos a cobro QR, promociones y estadísticas.
- QR de demostración por comercio y visualización de si hay una meta de fidelidad activa.
- Gestión de metas de compras y premios, y creación, edición o pausa de ofertas de cashback.
- Indicadores de demostración para compras registradas, premios entregados y promociones activas.

### Estado local y validación

La lógica compartida de promociones, progreso y ofertas está centralizada en `RewardsContext`. Se persiste con AsyncStorage y se valida al restaurar: por ejemplo, los objetivos de fidelidad deben estar entre 2 y 20 compras; las ofertas aceptan porcentajes enteros de 1 a 50. Una cola serializa las actualizaciones para evitar escrituras concurrentes del estado.

Los datos iniciales incluyen dos comercios de ejemplo (Panadería El Trigall y Café de la Esquina). Son datos de demostración, no un catálogo conectado a un servicio remoto.

## Decisiones de desarrollo y colaboración

- **Responsabilidades acordadas por el equipo:** Enrique se encargó del frontend móvil; Juan Pachacama (Juan P) se encargó del backend y de la integración de IA. La aplicación móvil y su experiencia de usuario se desarrollaron de forma colaborativa.
- **React Native y Expo:** se eligieron para construir y probar una aplicación móvil multiplataforma con JavaScript, navegación nativa y herramientas del ecosistema Expo.
- **Separación de experiencias por rol:** la navegación permite entrar como cliente o como dueño de negocio, con flujos diferenciados para cada uno.
- **Estado de recompensas compartido:** cliente y comercio consumen el mismo contexto local para que el progreso, las promociones y las ofertas de la demostración se reflejen en ambas experiencias.
- **Demostración segura del flujo comercial:** QR, saldo y compras se mantienen explícitamente como pruebas; no se simula la confirmación de una transacción financiera real.
- **Persistencia local con validación:** AsyncStorage permite conservar el estado de la demostración entre sesiones, y la restauración valida los datos antes de utilizarlos.
- **IA con propósito educativo:** Gemini se presenta como apoyo para autoeducación financiera, no como asesor ni como autoridad sobre decisiones financieras.

### Límite importante sobre el backend de IA

El README del proyecto identifica la integración con Google Gemini, pero en el código y los archivos de configuración de este repositorio no se encuentra documentado un servicio backend, sus rutas, el modelo exacto, la gestión de credenciales ni el contrato entre la app y el servidor. Por eso no se atribuyen aquí detalles técnicos que no estén verificables en el repositorio. La responsabilidad de Juan sobre backend e IA refleja el acuerdo del equipo; para que el proyecto quede reproducible, conviene añadir la documentación del servicio correspondiente (endpoint, configuración por entorno, formato de solicitud/respuesta, errores y despliegue).

**Seguridad:** no incluyas una clave privada de Gemini en el código de la app ni en el repositorio. En una integración desplegada, la app debe comunicarse con un backend controlado que proteja las credenciales y aplique límites de uso. No se debe enviar información financiera sensible a la IA.

## Equipo

- **Luis Enrique Pérez (Enrique):** frontend y experiencia móvil.
- **Juan Pachacama (Juan P):** backend e integración de IA, además de colaboración en el desarrollo móvil.

Se agradece a todas las personas que contribuyeron al proyecto. Los créditos describen las responsabilidades comunicadas por el equipo y no implican que cada parte esté desplegada o documentada técnicamente en este repositorio.

## Tecnologías

- React Native 0.86 y JavaScript.
- Expo SDK 57.
- React Navigation (navegación nativa y pestañas).
- AsyncStorage para persistencia local de la demostración.
- Expo Camera para escaneo de QR.
- `react-native-qrcode-svg` para mostrar códigos QR.
- Google Gemini API, indicada como proveedor de la experiencia de chat educativo del proyecto.

## Requisitos

- Node.js LTS.
- npm.

## Instalación y ejecución

Desde la raíz del repositorio:

```bash
npm install
npx expo start
```

Para iniciar directamente una plataforma:

```bash
npm run android
npm run ios
npm run web
```

Si el dispositivo no puede conectarse a Metro por la red local, prueba el modo túnel:

```bash
npx expo start --tunnel
```

Para Expo Go, utiliza una versión compatible con el SDK del proyecto y escanea el código QR de Expo. Para Android, también puedes usar un emulador configurado en Android Studio.
## Uso responsable

- Las compras, los saldos, los QR y las recompensas actuales son de demostración; no hay cargos reales.
- La información de la IA puede ser incorrecta, puede estar sujeta a límites de uso y tokens, y no es asesoría financiera. Verifica cualquier decisión importante con fuentes confiables o un profesional.
- No compartas contraseñas, números de cuenta, tarjetas ni otros datos sensibles en el chat.
- Antes de usar el proyecto en producción se necesitan, entre otros aspectos, un backend documentado, autenticación y autorización, almacenamiento remoto confiable, protección de credenciales y una integración real con un proveedor de pagos.
