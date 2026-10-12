export class Libro {
    constructor(id, titulo, autor, anio, leido = false) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.leido = leido;
    }
    marcarComoLeido() {
        this.leido = true;
    }
    marcarComoPendiente() {
        this.leido = false;
    }
}
