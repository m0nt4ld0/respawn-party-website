# Proyecto Final: Talento Games - Tienda de Videojuegos Retro

Este es un proyecto realizado como parte del curso **Talento Tech - React** durante el primer cuatrimestre de 2025. El proyecto simula un negocio de venta de videojuegos retro y está desarrollado en **React** utilizando **JSX**. La aplicación simula una tienda de videojuegos retro donde los usuarios pueden explorar una variedad de juegos, agregarlos a un carrito de compras y realizar la compra. 

## Características
- **Carrito de compras:** Los usuarios pueden agregar juegos al carrito y proceder a la compra.
- **API de RetroAchievements:** Se consumen datos en tiempo real de la API de RetroAchievements para mostrar información sobre los juegos retro y sus logros.
- **Interfaz intuitiva:** La interfaz es fácil de usar y se enfoca en una experiencia de compra cómoda.
- **Autenticación de usuarios:** Tanto con cuenta de Google como con cualquier otro e-mail.
- **Formulario de contacto:** Recibo en mi correo las consultas que el usuario envía a través de dicho formulario. Cuenta con una validación que impone un límite de hasta 3 (tres) envíos consecutivos. Tras sobrepasar ese límite, deberá esperar 15 (quince) minutos para poder consultar nuevamente.
- **Panel de Administración:** El usuario con privilegios de administrador será capaz de crear, editar y eliminar productos.

## Tecnologías utilizadas
- Integración con API de [RetroAchievements](https://retroachievements.org/), para obtener información detallada sobre los juegos retro y sus logros.
- Autenticación de usuarios con Firebase, ya sea con cuenta de Google o cualquier otro e-mail.
- Envío del formulario de contacto vía e-mail con Formspree.
- Usuario con privilegios de administrador.
- Crear, editar y eliminar productos (comportamiento simulado usando MockAPI).
- Estilos realizados con Bootstrap for React y CSS personalizado.
- Animaciones realizadas con Sweet Alert 2 y Framer Motion

## Requerimientos mínimos
- Node.js v18.x+ (recomendado 20.x)
- Nvm 18 (recomendado 20.x)
- Vite 6.2

## Cómo utilizarlo
A continuación, una guía paso a paso para descargar el proyecto y ejecutarlo localmente.
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

VITE_FORMSPREE_URL=YOUR_VITE_FORMSPREE_URL
```

### Ejecutar el proyecto
```bash
npm start
```

### Contribuciones
Este proyecto **no admite contribuciones**, por tratarse de un trabajo integrador del curso Talento Tech.

## Documentación de usuario
### Inicio
Un carousel responsive con imágenes de juegos retro populares. Debajo ofrece un menú con las consolas retro más visitadas.

### Nosotros
Esta sección describe brevemente la historia del emprendimiento de venta de juegos retro.

### Juegos
Incluye el listado completo de las consolas disponibles.
![Captura desde 2025-06-02 00-03-54](https://github.com/user-attachments/assets/ff890bd4-6925-4a12-ac43-312f60f6e284)

Al hacer clic en "Ver juegos" accedemos al catálogo de esa consola. Tendremos un menú Breadcrumb donde podremos volver fácilmente a alguno de los pasos anteriores. 
![Captura desde 2025-06-02 00-07-00](https://github.com/user-attachments/assets/972c0a41-4ba5-4da0-9295-9ce862192dfc)

Al hacer clic en el nombre del juego, se abre el detalle del mismo (que incluye datos como nombre, fecha de lanzamiento, una imagen, cantidad de jugadores, etc). 
También podremos agregar el juego al carrito. 
![Captura desde 2025-06-02 00-07-08](https://github.com/user-attachments/assets/d1eb1bb1-167f-4e38-91d3-7e4153772df0)
Nótese que es posible agregar múltiples copias de un mismo juego.

### Preguntas
Contiene una serie de preguntas frecuentes y sus respuestas serán visibles al hacer clic en la pregunta.
![Captura desde 2025-06-02 00-03-23](https://github.com/user-attachments/assets/0f6cf381-a8a8-4926-93fa-84cee143c9aa)

### Contacto
A través de este formulario, es posible enviar dudas y/o comentarios. Admite hasta 3 (tres) comentarios consecutivos. 

Pasado ese límite, advierte al usuario que tendrá que esperar 15 (quince) minutos para poder volver a enviar otra consulta.
![Captura desde 2025-06-02 00-02-39](https://github.com/user-attachments/assets/0d3cb4ea-c4de-4d8a-8399-cdeeeb926644)

### Carrito
- Visualizar productos agregados
- Modificar las cantidades de items de cada producto
- Quitar productos
- Eliminar todos los productos (vaciar carrito)
- Proceder a la compra

Si el carrito está vacío, mostrará el mensaje "No hay productos en el carrito." con un botón que nos invita a explorar el catálogo para seleccionar juegos para adquirirlos.
![Captura desde 2025-06-01 23-54-59](https://github.com/user-attachments/assets/da4b0ae1-a6a3-4838-b550-57e56d828f1d)

### Registro de usuario

### Iniciar sesión (autenticación)
La web ofrece la posibilidad de autenticarse usando una cuenta de Google, o autenticarse utilizando otro e-mail que haya sido registrado previamente (ver Registro de usuario). 

Al hacer clic en el botón Ingresar de la barra de navegación, nos lleva a la siguiente página para iniciar sesión en el sitio:
![Captura desde 2025-06-01 23-59-10](https://github.com/user-attachments/assets/76a85a05-be88-4746-ad07-823307b3f6dc)

Inmediatamente después de autenticarnos, nos lleva a nuestro perfil. Si iniciamos sesión con nuestra cuenta de Google, muestra nuestra foto:
![Captura desde 2025-06-02 00-15-55](https://github.com/user-attachments/assets/f7c1e598-6b2a-4f61-b23a-c83cc9055616)


### Iniciar sesión como administrador
Para inicar sesión con privilegios de Administrador, utilizar:
``` 
correo admin@talentogames.com 
contraseña admin123
```
Esta cuenta de administrador es ficticia, hecha específicamente para demostrar las funcionalidades de agregar, quitar o modificar productos.
![Captura desde 2025-06-02 00-14-54](https://github.com/user-attachments/assets/2efc3316-97b7-45b8-b9ed-311dfba28e99)

El administrador tiene la posibilidad de dar de alta nuevos productos, editar los productos existentes y eliminar productos.

Al intentar eliminar un producto, nos va a pedir la confirmación de que realmente estamos seguros, antes de proceder:
![Captura desde 2025-06-02 00-15-01](https://github.com/user-attachments/assets/d23e8f26-586a-46b2-8a45-ce709dd23dd1)


### Página no encontrada (404)
Si llegaste a esta página, es muy probable que sea porque
- Escribiste mal una dirección en la barra de direcciones
- Una página que era parte de la web fue movida o renombrada y no se actualizó algún enlace que tiene que ver con ella
- Sos desarrollador/a y/o QA y querés comprobar si puse una página 404 personalizada
En cualquiera de los casos antes mencionados, vas a ver la siguiente pantalla:
![Captura desde 2025-06-02 00-07-30](https://github.com/user-attachments/assets/0d3ce7eb-5f4f-4f70-83d0-11975a3772ec)
