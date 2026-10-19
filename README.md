# Catálogo de Libros MVC

## 1. Descripción del proyecto

Catálogo de Libros MVC es una aplicación web desarrollada con TypeScript que permite administrar un catálogo personal de libros. El sistema facilita el registro, consulta, edición, eliminación y organización de libros mediante una interfaz gráfica sencilla e intuitiva.

La aplicación implementa el patrón de arquitectura Modelo-Vista-Controlador (MVC) y utiliza `localStorage` para conservar la información registrada en el navegador.

## 2. Funcionalidades

- Registrar libros con título, autor, año de publicación, género y calificación.
- Calificar libros mediante una escala de 1 a 5 estrellas.
- Buscar libros por título, autor o género.
- Filtrar libros por género y estado de lectura.
- Ordenar los libros alfabéticamente por título o por año de publicación.
- Marcar libros como leídos o pendientes.
- Editar la información de los libros registrados.
- Eliminar libros mediante una confirmación.
- Validar campos obligatorios, rangos de fechas y registros duplicados por título y autor.
- Almacenar y recuperar los datos mediante `localStorage`.
- Mostrar estadísticas del catálogo: total de libros, libros leídos y pendientes.
- Calcular el promedio de las calificaciones registradas.

## 3. Tecnologías utilizadas

- **HTML5:** estructura de la interfaz web.
- **CSS3:** diseño y presentación visual.
- **TypeScript:** implementación de la lógica de la aplicación.
- **JavaScript:** código generado a partir de TypeScript para ejecutarse en el navegador.
- **Node.js y npm:** entorno de ejecución y administración de dependencias.
- **LocalStorage:** almacenamiento persistente de los datos en el navegador.

## 4. Arquitectura del proyecto

El sistema utiliza el patrón Modelo-Vista-Controlador (MVC), separando la lógica de los datos, la interfaz y el manejo de eventos.

- **Models (`src/models`):** define la clase `Libro` y sus atributos, así como las operaciones relacionadas con los datos de cada libro.
- **Views (`src/views`):** construye la interfaz, presenta los libros y muestra las estadísticas.
- **Controllers (`src/controllers`):** gestiona los eventos del usuario, las validaciones y las operaciones del catálogo.
- **Services (`src/services`):** administra el almacenamiento y la recuperación de los libros mediante `localStorage`.
- **Styles (`src/styles`):** contiene las hojas de estilo CSS de la aplicación.
- **Dist (`dist`):** contiene los archivos JavaScript generados durante la compilación de TypeScript.

## 5. Requisitos previos

Antes de ejecutar el proyecto, se necesita:

- Node.js y npm instalados.
- Visual Studio Code u otro editor de código.
- La extensión Live Server para Visual Studio Code.

## 6. Instalación y ejecución

### 6.1. Clonar el repositorio

Ejecutar el siguiente comando en la terminal:

```bash
git clone https://github.com/Brissvey/LAB2DEPOE.git
```

### 6.2. Acceder al proyecto

```bash
cd LAB2DEPOE
```

### 6.3. Instalar las dependencias

```bash
npm install
```

### 6.4. Compilar el proyecto

```bash
npm run build
```

Este comando compila los archivos TypeScript y genera el código JavaScript correspondiente en la carpeta `dist`.

### 6.5. Ejecutar la aplicación

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Localizar el archivo `index.html`.
3. Hacer clic derecho sobre el archivo.
4. Seleccionar **Open with Live Server**.
5. Utilizar el catálogo desde el navegador.

## 7. Persistencia de datos

La aplicación utiliza `localStorage` para guardar los libros en el navegador. La información permanece disponible al recargar o volver a abrir la aplicación en el mismo navegador y origen.

Los datos se almacenan localmente y no se sincronizan automáticamente entre diferentes navegadores o dispositivos.

## 8. Autoría

Proyecto académico desarrollado para la asignatura correspondiente, con el propósito de aplicar TypeScript, el patrón MVC, manejo de eventos, validaciones y persistencia de datos en una aplicación web.
