
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
                <h2>Registrar libro</h2>

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

                    <button type="submit" id="btn-guardar">
                        Registrar libro
                    </button>
                    <button type="button" id="btn-cancelar"
                        hidden>Cancelar edición</button>
                </form>
            </section>

            <section class="panel">
                <h2>Mis libros</h2>

                <input type="search" id="busqueda"
                    placeholder="Buscar por título o autor...">

                <select id="filtro">
                    <option value="todos">Todos los libros</option>
                    <option value="leidos">Leídos</option>
                    <option value="pendientes">Pendientes</option>
                </select>

                <p id="contador"></p>
                <div id="lista-libros" class="lista-libros"></div>
                <p id="mensaje" role="status"></p>
            </section>
        `;
    }

    renderizar(libros: Libro[]): void {
        const lista = document.getElementById("lista-libros")!;
        const contador = document.getElementById("contador")!;

        contador.textContent = `Total de libros: ${libros.length}`;

        if (libros.length === 0) {
            lista.innerHTML = "<p>No hay libros para mostrar.</p>";
            return;
        }

        lista.innerHTML = libros.map(libro => `
            <article class="libro">
                <h3>${this.escapar(libro.titulo)}</h3>
                <p><strong>Autor:</strong> ${this.escapar(libro.autor)}</p>
                <p><strong>Año:</strong> ${libro.anio}</p>
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
        document.getElementById("mensaje")!.textContent = mensaje;
    }

    obtenerFormulario(): HTMLFormElement {
        return document.getElementById("form-libro") as HTMLFormElement;
    }
}
