# Centro Vida FIVGO - Frontend Panel de Citas

Este es el frontend de la aplicacion de gestion de citas para el Centro Vida FIVGO, construido con React y Tailwind CSS.

## Tecnologias Principales

* React (v18+): Libreria para la interfaz de usuario.
* Vite: Herramienta de compilacion (Bundler) ultra rapida.
* Tailwind CSS (v4): Framework de utilidades CSS para diseno agil y responsivo.
* Lucide React: Coleccion de iconos modernos.

## Estructura del Proyecto

* src/App.jsx: Componente principal que contiene toda la logica de la tabla, filtros y diseno.
* src/main.jsx: Punto de entrada de la aplicacion.
* src/index.css: Archivo de estilos principal (importa Tailwind).
* vite.config.js: Configuracion de Vite (incluye el plugin de Tailwind).

## Instalacion y Ejecucion Local

1. Asegurate de tener Node.js instalado (https://nodejs.org/).
2. Abre una terminal en esta carpeta (frontend).
3. Instala las dependencias:
   npm install
4. Inicia el servidor de desarrollo:
   npm run dev
5. Abre tu navegador en http://localhost:5173.

## Personalizacion (Branding)

Los colores de la clinica estan definidos en el objeto 'colors' dentro de src/App.jsx:

* Cian: #2cc2d1 (Primario, Titulos, Estado "En Consulta")
* Naranja: #f2711c (Acentos, FIVGO, Estado "En Espera")
* Violeta: #8e7cc3 (Detalles, Estado "Pendiente")

## Despliegue en Red Local (Modo Tablet)

Si deseas visualizar el panel en una tablet conectada a la misma red Wi-Fi:

1. Ejecuta el servidor exponiendo la IP local:
   npm run dev -- --host
2. Busca en la consola la URL que dice 'Network:' (ej. http://192.168.X.X:5173/).
3. Ingresa esa direccion en el navegador de la tablet.