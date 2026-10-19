export class Libro {
    constructor(id, titulo, autor, anio, leido = false, genero = "Sin género", calificacion = 0) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.leido = leido;
        this.genero = genero;
        this.calificacion = calificacion;
    }
    marcarComoLeido() {
        this.leido = true;
    }
    marcarComoPendiente() {
        this.leido = false;
    }
    actualizar(titulo, autor, anio, genero, calificacion) {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.genero = genero;
        this.calificacion = calificacion;
    }
    validarCalificacion() {
        return Number.isInteger(this.calificacion) &&
            this.calificacion >= 1 &&
            this.calificacion <= 5;
    }
}
