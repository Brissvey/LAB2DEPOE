# Catálogo de Libros MVC

## Descripción
Proyecto desarrollado en TypeScript para administrar un catálogo personal de libros. Permite registrar libros y llevar un control de las lecturas mediante una interfaz web sencilla.

## Funcionalidades
- Registrar libros con título, autor y año de publicación.
- Buscar libros por título o autor.
- Filtrar libros según su estado de lectura.
- Marcar libros como leídos o pendientes.
- Editar la información de los libros.
- Eliminar libros del catálogo con confirmación.
- Guardar los datos en el almacenamiento local del navegador para conservarlos al recargar la página.

## Tecnologías utilizadas
- HTML5
- CSS3
- TypeScript
- JavaScript
- Node.js y npm

## Arquitectura
El proyecto utiliza el patrón MVC (Modelo-Vista-Controlador) para organizar el código:

- **Models:** representa la información de los libros.
- **Views:** administra la interfaz y la presentación de los libros.
- **Controllers:** gestiona las acciones del usuario y conecta la vista con el modelo.
- **Services:** se encarga del almacenamiento y la gestión de los datos.
- **Styles:** contiene los estilos visuales de la aplicación.

## Instalación y ejecución

### Requisitos previos
- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado Visual Studio Code.
- Tener instalada la extensión **Live Server** en Visual Studio Code.

### Pasos para ejecutar el proyecto

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Brissvey/LAB2DEPOE.git
   ```

2. Entrar en la carpeta del proyecto:

   ```bash
   cd LAB2DEPOE
   ```

3. Instalar las dependencias:

   ```bash
   npm install
   ```

4. Compilar el código TypeScript:

   ```bash
   npm run build
   ```

5. Abrir la carpeta `LAB2DEPOE` en Visual Studio Code.

6. Abrir el archivo `index.html` con la extensión **Live Server**.

### Almacenamiento de datos

Los libros se guardan en el almacenamiento local del navegador (`localStorage`). Los datos permanecen disponibles en el mismo navegador y origen, incluso después de cerrar y volver a abrir la página.
