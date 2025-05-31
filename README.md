# Proyecto Final: Talento Games - Tienda de Videojuegos Retro

Este es un proyecto realizado como parte del curso **Talento Tech - React** durante el primer cuatrimestre de 2025. El proyecto simula un negocio de venta de videojuegos retro y está desarrollado en **React** utilizando **JSX**.

## Descripción

La aplicación simula una tienda de videojuegos retro donde los usuarios pueden explorar una variedad de juegos, agregarlos a un carrito de compras y realizar la compra. Los datos de los videojuegos, como títulos, imágenes y logros, se obtienen mediante la API de [RetroAchievements](https://retroachievements.org/), la cual proporciona información detallada sobre los juegos retro y sus logros.

### Características
- **Carrito de compras:** Los usuarios pueden agregar juegos al carrito y proceder a la compra.
- **API de RetroAchievements:** Se consumen datos en tiempo real de la API de RetroAchievements para mostrar información sobre los juegos retro y sus logros.
- **Interfaz intuitiva:** La interfaz es fácil de usar y se enfoca en una experiencia de compra cómoda.
- **Autenticación de usuarios con Firebase:** Tanto con cuenta de Google como con cualquier otro e-mail.

## Cómo utilizarlo

### Clonar el repositorio

Para clonar este repositorio en tu máquina local, utiliza el siguiente comando:

```bash
git clone https://github.com/m0nt4ld0/respawn-party-website.git
```

### Instalar las dependencias
Una vez clonado el repositorio, navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias:
```bash
cd respawn-party-website
npm install
```

### Configuración del archivo .env
Este proyecto utiliza variables de entorno para acceder a la API de RetroAchievements y a Firebase. Para configurarlas:

Crea un archivo .env en la raíz del proyecto.

Abre el archivo .env y agrega tus credenciales de RetroAchievements y de Firebase siguiendo este formato:

```bash
VITE_RA_USERNAME=YOUR_RETROACHIEVEMENTS_USERNAME
VITE_RA_APIKEY=YOUR_RETROACHIEVEMENTS_API_KEY

VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID

```

### Ejecutar el proyecto
```bash
npm start
```

### Contribuciones
Este proyecto no admite contribuciones, por tratarse de un trabajo práctico del curso Talento Tech.

