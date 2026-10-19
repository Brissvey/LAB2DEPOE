
import { Libro } from "../models/Libro.js";

export class LibroView {
    private contenedor: HTMLElement;

    constructor() {
        this.contenedor = document.getElementById("app")!;

        this.contenedor.innerHTML = `
            <header class="encabezado">
                <h1>📚 Catálogo de Libros</h1>
                <p>Organiza tus libros y registra tus lecturas</p>
            </header>

            <section class="panel">
                <h2 id="titulo-formulario">Registrar libro</h2>

                <form id="form-libro">
                    <input type="hidden" id="libro-id">

                    <label for="titulo">Título</label>
                    <input id="titulo" type="text"
                        placeholder="Título del libro" required>

                    <label for="autor">Autor</label>
                    <input id="autor" type="text"
                        placeholder="Nombre del autor" required>

                    <label for="anio">Año de publicación</label>
                    <input id="anio" type="number"
                        min="1" max="${new Date().getFullYear()}"
                        placeholder="Ej. 2024" required>

                    <label for="genero">Género</label>
                    <select id="genero" required>
                        <option value="">Selecciona un género</option>
                        <option value="Novela">Novela</option>
                        <option value="Ciencia ficción">Ciencia ficción</option>
                        <option value="Fantasía">Fantasía</option>
                        <option value="Misterio">Misterio</option>
                        <option value="Terror">Terror</option>
                        <option value="Romance">Romance</option>
                        <option value="Historia">Historia</option>
                        <option value="Biografía">Biografía</option>
                        <option value="Educación">Educación</option>
                        <option value="Otro">Otro</option>
                    </select>

                    <label for="calificacion">Calificación</label>
                    <select id="calificacion" required>
                        <option value="0">Sin calificación</option>
                        <option value="1">⭐ 1 estrella</option>
                        <option value="2">⭐⭐ 2 estrellas</option>
                        <option value="3">⭐⭐⭐ 3 estrellas</option>
                        <option value="4">⭐⭐⭐⭐ 4 estrellas</option>
                        <option value="5">⭐⭐⭐⭐⭐ 5 estrellas</option>
                    </select>

                    <button type="submit" id="btn-guardar">
                        Registrar libro
                    </button>

                    <button type="button" id="btn-cancelar" hidden>
                        Cancelar edición
                    </button>
                </form>
            </section>

            <section class="panel">
                <h2>Estadísticas de lectura</h2>
                <div id="estadisticas" class="estadisticas"></div>
            </section>

            <section class="panel">
                <h2>Mis libros</h2>

                <label for="busqueda">Buscar</label>
                <input type="search" id="busqueda"
                    placeholder="Buscar por título, autor o género...">

                <label for="filtro">Estado de lectura</label>
                <select id="filtro">
                    <option value="todos">Todos los libros</option>
                    <option value="leidos">Leídos</option>
                    <option value="pendientes">Pendientes</option>
                </select>

                <label for="filtro-genero">Género</label>
                <select id="filtro-genero">
                    <option value="todos">Todos los géneros</option>
                    <option value="Novela">Novela</option>
                    <option value="Ciencia ficción">Ciencia ficción</option>
                    <option value="Fantasía">Fantasía</option>
                    <option value="Misterio">Misterio</option>
                    <option value="Terror">Terror</option>
                    <option value="Romance">Romance</option>
                    <option value="Historia">Historia</option>
                    <option value="Biografía">Biografía</option>
                    <option value="Educación">Educación</option>
                    <option value="Otro">Otro</option>
                    <option value="Sin género">Sin género</option>
                </select>

                <label for="ordenar">Ordenar libros</label>
                <select id="ordenar">
                    <option value="ninguno">Orden original</option>
                    <option value="titulo">Por título (A-Z)</option>
                    <option value="anio">Por año (más reciente primero)</option>
                </select>

                <p id="contador"></p>
                <div id="lista-libros" class="lista-libros"></div>
                <p id="mensaje" role="status" class="mensaje" aria-live="polite"></p>
            </section>
        `;
    }

    renderizar(libros: Libro[]): void {
        const lista = document.getElementById("lista-libros")!;
        const contador = document.getElementById("contador")!;

        contador.textContent = `Libros mostrados: ${libros.length}`;

        this.renderEstadisticas(libros);

        if (libros.length === 0) {
            lista.innerHTML = "<p>No hay libros para mostrar.</p>";
            return;
        }

        lista.innerHTML = libros.map(libro => `
            <article class="libro">
                <h3>${this.escapar(libro.titulo)}</h3>
                <p><strong>Autor:</strong> ${this.escapar(libro.autor)}</p>
                <p><strong>Año:</strong> ${libro.anio}</p>
                <p><strong>Género:</strong> ${this.escapar(libro.genero)}</p>
                <p><strong>Calificación:</strong>
                    ${this.renderEstrellas(libro.calificacion)}
                </p>
                <p><strong>Estado:</strong>
                    ${libro.leido ? "Leído" : "Pendiente"}
                </p>
                <div class="acciones">
                    <button data-accion="estado" data-id="${libro.id}">
                        ${libro.leido ? "Marcar pendiente" : "Marcar leído"}
                    </button>
                    <button data-accion="editar" data-id="${libro.id}">
                        Editar
                    </button>
                    <button data-accion="eliminar" data-id="${libro.id}">
                        Eliminar
                    </button>
                </div>
            </article>
        `).join("");
    }

    renderEstrellas(calificacion: number): string {
        if (calificacion < 1 || calificacion > 5) {
            return "Sin calificación";
        }

        return "⭐".repeat(calificacion);
    }

    private renderEstadisticas(libros: Libro[]): void {
        const estadisticas = document.getElementById("estadisticas")!;

        const total = libros.length;
        const leidos = libros.filter(libro => libro.leido).length;
        const pendientes = total - leidos;

        const calificados = libros.filter(
            libro => libro.calificacion >= 1 && libro.calificacion <= 5
        );

        const promedio = calificados.length > 0
            ? (
                calificados.reduce(
                    (suma, libro) => suma + libro.calificacion, 0
                ) / calificados.length
            ).toFixed(1)
            : "Sin calificaciones";

        estadisticas.innerHTML = `
            <p><strong>Total de libros:</strong> ${total}</p>
            <p><strong>Leídos:</strong> ${leidos}</p>
            <p><strong>Pendientes:</strong> ${pendientes}</p>
            <p><strong>Promedio de calificación:</strong> ${promedio}</p>
        `;
    }

    private escapar(texto: string): string {
        return texto.replace(/[&<>"']/g, caracter => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[caracter]!);
    }

    
mostrarMensaje(mensaje: string): void {
    const elemento = document.getElementById("mensaje")!;

    elemento.textContent = mensaje;
    elemento.style.display = "block";
    elemento.style.position = "fixed";
    elemento.style.top = "20px";
    elemento.style.left = "50%";
    elemento.style.transform = "translateX(-50%)";
    elemento.style.width = "max-content";
    elemento.style.maxWidth = "90%";
    elemento.style.padding = "16px 24px";
    elemento.style.borderRadius = "10px";
    elemento.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
    elemento.style.zIndex = "9999";
    elemento.style.fontWeight = "bold";
    elemento.style.textAlign = "center";
    elemento.style.backgroundColor =
        mensaje.toLowerCase().includes("ya está registrado") ||
        mensaje.toLowerCase().includes("error") ||
        mensaje.toLowerCase().includes("válido") ||
        mensaje.toLowerCase().includes("completa")
            ? "#ffe5e5"
            : "#e5f7e9";
    elemento.style.color =
        mensaje.toLowerCase().includes("ya está registrado") ||
        mensaje.toLowerCase().includes("error") ||
        mensaje.toLowerCase().includes("válido") ||
        mensaje.toLowerCase().includes("completa")
            ? "#b42318"
            : "#166534";
}


    obtenerFormulario(): HTMLFormElement {
        return document.getElementById("form-libro") as HTMLFormElement;
    }
}
