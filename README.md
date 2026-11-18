# DEUNA_VECI — educación financiera con IA 🚀

DEUNA_VECI es una aplicación móvil creada para un evento tecnológico. El objetivo fue convertir una idea en un producto palpable: una herramienta que utiliza modelos de inteligencia artificial para acercar la educación financiera y ayudar a las personas a aprender y tomar decisiones con mayor información.

La aplicación incorpora un chat conectado con la API de Google Gemini como apoyo para la autoeducación financiera. Su propósito es educativo; las respuestas generadas por IA pueden ser inexactas y no sustituyen el asesoramiento financiero profesional.

## El equipo

Este proyecto fue un esfuerzo colaborativo. La mayor parte del código de la aplicación móvil fue desarrollada por **Luis Enrique Pérez**, en colaboración con **Juan Pachacama**. La integración del chat con la API de Gemini también formó parte del trabajo de desarrollo. **El resto del equipo colaboró en el mockup de Figma, las vistas y el flujo de la aplicación.**

Se reconoce y agradece la contribución de todas las personas que hicieron posible el proyecto. Esta documentación conserva los créditos del equipo; las contribuciones mencionadas describen los roles disponibles en la información del proyecto.

## Descargar la aplicación

La aplicación se preparó para pruebas y se puede descargar aquí:

[Descargar APK](https://expo.dev/artifacts/eas/uBcfWAtRDJR5zYdFyxufru.apk)

La instalación no requiere ingresar datos ni conceder permisos.

## Tecnologías

- React Native con JavaScript.
- Expo SDK 57 para desarrollo y construcción de la aplicación.
- API de Google Gemini para la experiencia de chat con IA.

## Requisitos

- Node.js LTS.
- npm.

## Instalación y ejecución

Desde la carpeta del proyecto, instala las dependencias e inicia Expo:

```bash
npm install
npx expo start
```

Si la red Wi-Fi impide que el teléfono se conecte a Metro, inicia Expo en modo túnel:

```bash
npx expo start --tunnel
```

### Probar en un dispositivo o emulador

- Para usar Expo Go, instala una versión compatible con Expo SDK 57 y escanea el código QR que muestra Expo.
- Para ejecutar en un emulador Android, instala Android Studio y configura Android SDK. Después inicia Expo y presiona `a`.

## Recomendación de uso

El chat depende de una API de IA y puede estar sujeto a límites de uso o tokens. Evita enviar consultas repetidas o innecesarias. Recuerda que la información generada es educativa y conviene verificarla antes de tomar decisiones financieras.
