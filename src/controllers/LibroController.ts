import { Libro } from "../models/Libro.js";
import { LibroView } from "../views/LibroView.js";
import { StorageService } from "../services/StorageService.js";

export class LibroController {
    private libros: Libro[] = [];
    private view: LibroView;
    constructor(view: LibroView) {
        this.view = view;
        this.libros = StorageService.cargar();
        this.configurarEventos();
        this.actualizarVista();
    }

    private configurarEventos(): void {
        const formulario = this.view.obtenerFormulario();
        formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.guardarLibro();
        });

        document.getElementById("busqueda")!
            .addEventListener("input", () => this.actualizarVista());

        document.getElementById("filtro")!
            .addEventListener("change", () => this.actualizarVista());

        document.getElementById("lista-libros")!
            .addEventListener("click", (evento) => {
                const boton = (evento.target as HTMLElement)
                    .closest("button[data-accion]") as HTMLButtonElement | null;
                if (!boton) return;
                const id = Number(boton.dataset.id);
                const accion = boton.dataset.accion;
                if (accion === "editar") this.editarLibro(id);
                if (accion === "eliminar") this.eliminarLibro(id);
                if (accion === "estado") this.cambiarEstado(id);
            });

        document.getElementById("btn-cancelar")!
            .addEventListener("click", () => this.limpiarFormulario());
    }

    private guardarLibro(): void {
        const idInput = document.getElementById("libro-id") as HTMLInputElement;
        const tituloInput = document.getElementById("titulo") as HTMLInputElement;
        const autorInput = document.getElementById("autor") as HTMLInputElement;
        const anioInput = document.getElementById("anio") as HTMLInputElement;

        const titulo = tituloInput.value.trim();
        const autor = autorInput.value.trim();
        const anio = Number(anioInput.value);
        const id = Number(idInput.value);

        if (!titulo || !autor || !anioInput.value.trim()) {
            this.view.mostrarMensaje("Completa todos los campos.");
            return;
        }

        if (!Number.isInteger(anio) ||
            anio < 1 || anio > new Date().getFullYear()) {
            this.view.mostrarMensaje("Introduce un año válido.");
            return;
        }

        if (idInput.value) {
            const libro = this.libros.find(item => item.id === id);
            if (!libro) return;
            libro.titulo = titulo;
            libro.autor = autor;
            libro.anio = anio;
            this.view.mostrarMensaje("Libro actualizado correctamente.");
        } else {
            const nuevoLibro = new Libro(
                Date.now(),
                titulo,
                autor,
                anio,
                false
            );

            this.libros.push(nuevoLibro);
            this.view.mostrarMensaje("Libro registrado correctamente.");
        }

        this.guardarDatos();
        this.limpiarFormulario();
        this.actualizarVista();
    }

    private editarLibro(id: number): void {
        const libro = this.libros.find(item => item.id === id);

        if (!libro) return;

        (document.getElementById("libro-id") as HTMLInputElement).value =
            String(libro.id);
        (document.getElementById("titulo") as HTMLInputElement).value =
            libro.titulo;
        (document.getElementById("autor") as HTMLInputElement).value =
            libro.autor;
        (document.getElementById("anio") as HTMLInputElement).value =
            String(libro.anio);

        (document.getElementById("btn-guardar") as HTMLButtonElement)
            .textContent = "Guardar cambios";
        (document.getElementById("btn-cancelar") as HTMLButtonElement)
            .hidden = false;
        this.view.mostrarMensaje("Editando libro.");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    private eliminarLibro(id: number): void {
        const libro = this.libros.find(item => item.id === id);
        if (!libro) return;
        if (!window.confirm(`¿Deseas eliminar "${libro.titulo}"?`)) {
            return;
        }
        this.libros = this.libros.filter(item => item.id !== id);
        this.guardarDatos();
        this.actualizarVista();
        this.view.mostrarMensaje("Libro eliminado correctamente.");
    }

    private cambiarEstado(id: number): void {
        const libro = this.libros.find(item => item.id === id);
        if (!libro) return;
        libro.leido = !libro.leido;
        this.guardarDatos();
        this.actualizarVista();
        this.view.mostrarMensaje("Estado del libro actualizado.");
    }

    private limpiarFormulario(): void {
        this.view.obtenerFormulario().reset();
        (document.getElementById("libro-id") as HTMLInputElement).value = "";
        (document.getElementById("btn-guardar") as HTMLButtonElement)
            .textContent = "Registrar libro";
        (document.getElementById("btn-cancelar") as HTMLButtonElement)
            .hidden = true;
    }

    private guardarDatos(): void {
        StorageService.guardar(this.libros);
    }

    private actualizarVista(): void {
        const busqueda = (
            document.getElementById("busqueda") as HTMLInputElement
        ).value.trim().toLowerCase();
        const filtro = (
            document.getElementById("filtro") as HTMLSelectElement
        ).value;
        const librosFiltrados = this.libros.filter(libro => {
            const coincideBusqueda =
                libro.titulo.toLowerCase().includes(busqueda) ||
                libro.autor.toLowerCase().includes(busqueda);
            const coincideFiltro =
                filtro === "todos" ||
                (filtro === "leidos" && libro.leido) ||
                (filtro === "pendientes" && !libro.leido);
            return coincideBusqueda && coincideFiltro;
        });
        this.view.renderizar(librosFiltrados);
    }
}
