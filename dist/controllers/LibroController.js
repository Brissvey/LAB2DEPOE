import { Libro } from "../models/Libro.js";
import { StorageService } from "../services/StorageService.js";
export class LibroController {
    constructor(view) {
        this.libros = [];
        this.view = view;
        this.libros = StorageService.cargar();
        this.configurarEventos();
        this.actualizarVista();
    }
    configurarEventos() {
        this.view.obtenerFormulario().addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.guardarLibro();
        });
        document.getElementById("busqueda")
            .addEventListener("input", () => this.actualizarVista());
        document.getElementById("filtro")
            .addEventListener("change", () => this.actualizarVista());
        document.getElementById("filtro-genero")
            .addEventListener("change", () => this.actualizarVista());
        document.getElementById("ordenar")
            .addEventListener("change", () => this.actualizarVista());
        document.getElementById("lista-libros")
            .addEventListener("click", (evento) => {
            const boton = evento.target
                .closest("button[data-accion]");
            if (!boton)
                return;
            const id = Number(boton.dataset.id);
            const accion = boton.dataset.accion;
            if (accion === "editar")
                this.editarLibro(id);
            if (accion === "eliminar")
                this.eliminarLibro(id);
            if (accion === "estado")
                this.cambiarEstado(id);
        });
        document.getElementById("btn-cancelar")
            .addEventListener("click", () => {
            this.limpiarFormulario();
            this.view.mostrarMensaje("Edición cancelada.");
        });
    }
    guardarLibro() {
        const idInput = document.getElementById("libro-id");
        const tituloInput = document.getElementById("titulo");
        const autorInput = document.getElementById("autor");
        const anioInput = document.getElementById("anio");
        const generoInput = document.getElementById("genero");
        const calificacionInput = document.getElementById("calificacion");
        const titulo = tituloInput.value.trim();
        const autor = autorInput.value.trim();
        const anio = Number(anioInput.value);
        const genero = generoInput.value;
        const calificacion = Number(calificacionInput.value);
        const id = Number(idInput.value);
        const editando = idInput.value !== "";
        if (!titulo || !autor || !anioInput.value.trim() || !genero) {
            this.view.mostrarMensaje("Completa todos los campos obligatorios.");
            return;
        }
        if (!Number.isInteger(anio) ||
            anio < 1 || anio > new Date().getFullYear()) {
            this.view.mostrarMensaje("Introduce un año válido.");
            return;
        }
        if (!Number.isInteger(calificacion) ||
            calificacion < 0 || calificacion > 5) {
            this.view.mostrarMensaje("La calificación debe estar entre 1 y 5, o ser 0 si no deseas calificar.");
            return;
        }
        if (editando && !this.libros.some(libro => libro.id === id)) {
            this.view.mostrarMensaje("No se encontró el libro que deseas editar.");
            return;
        }
        const duplicado = this.libros.some(libro => libro.id !== id &&
            libro.titulo.toLowerCase() === titulo.toLowerCase() &&
            libro.autor.toLowerCase() === autor.toLowerCase());
        if (duplicado) {
            alert("Este libro ya existe en tu catálogo.");
            this.view.mostrarMensaje("Este libro ya existe en tu catálogo.");
            return;
        }
        if (editando) {
            const libro = this.libros.find(item => item.id === id);
            libro.actualizar(titulo, autor, anio, genero, calificacion);
            this.view.mostrarMensaje("Libro actualizado correctamente.");
        }
        else {
            const nuevoLibro = new Libro(Date.now(), titulo, autor, anio, false, genero, calificacion);
            this.libros.push(nuevoLibro);
            this.view.mostrarMensaje("Libro registrado correctamente.");
        }
        this.guardarDatos();
        this.limpiarFormulario();
        this.actualizarVista();
    }
    editarLibro(id) {
        const libro = this.libros.find(item => item.id === id);
        if (!libro)
            return;
        document.getElementById("libro-id").value =
            String(libro.id);
        document.getElementById("titulo").value =
            libro.titulo;
        document.getElementById("autor").value =
            libro.autor;
        document.getElementById("anio").value =
            String(libro.anio);
        document.getElementById("genero").value =
            libro.genero;
        document.getElementById("calificacion").value =
            String(libro.calificacion);
        document.getElementById("titulo-formulario")
            .textContent = "Editar libro";
        document.getElementById("btn-guardar")
            .textContent = "Guardar cambios";
        document.getElementById("btn-cancelar")
            .hidden = false;
        this.view.mostrarMensaje("Editando libro.");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    eliminarLibro(id) {
        const libro = this.libros.find(item => item.id === id);
        if (!libro)
            return;
        if (!window.confirm(`¿Deseas eliminar "${libro.titulo}"?`)) {
            return;
        }
        this.libros = this.libros.filter(item => item.id !== id);
        this.guardarDatos();
        this.actualizarVista();
        this.view.mostrarMensaje("Libro eliminado correctamente.");
    }
    cambiarEstado(id) {
        const libro = this.libros.find(item => item.id === id);
        if (!libro)
            return;
        libro.leido = !libro.leido;
        this.guardarDatos();
        this.actualizarVista();
        this.view.mostrarMensaje("Estado del libro actualizado.");
    }
    limpiarFormulario() {
        this.view.obtenerFormulario().reset();
        document.getElementById("libro-id").value = "";
        document.getElementById("titulo-formulario")
            .textContent = "Registrar libro";
        document.getElementById("btn-guardar")
            .textContent = "Registrar libro";
        document.getElementById("btn-cancelar")
            .hidden = true;
    }
    guardarDatos() {
        StorageService.guardar(this.libros);
    }
    actualizarVista() {
        const busqueda = document.getElementById("busqueda").value.trim().toLowerCase();
        const filtro = document.getElementById("filtro").value;
        const filtroGenero = document.getElementById("filtro-genero").value;
        const ordenar = document.getElementById("ordenar").value;
        let librosFiltrados = this.libros.filter(libro => {
            const coincideBusqueda = libro.titulo.toLowerCase().includes(busqueda) ||
                libro.autor.toLowerCase().includes(busqueda) ||
                libro.genero.toLowerCase().includes(busqueda);
            const coincideEstado = filtro === "todos" ||
                (filtro === "leidos" && libro.leido) ||
                (filtro === "pendientes" && !libro.leido);
            const coincideGenero = filtroGenero === "todos" ||
                libro.genero === filtroGenero;
            return coincideBusqueda && coincideEstado && coincideGenero;
        });
        if (ordenar === "titulo") {
            librosFiltrados.sort((a, b) => a.titulo.localeCompare(b.titulo, "es", {
                sensitivity: "base"
            }));
        }
        else if (ordenar === "anio") {
            librosFiltrados.sort((a, b) => b.anio - a.anio);
        }
        this.view.renderizar(librosFiltrados);
    }
}
