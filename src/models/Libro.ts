
export class Libro {
    constructor(
        public id: number,
        public titulo: string,
        public autor: string,
        public anio: number,
        public leido: boolean = false,
        public genero: string = "Sin género",
        public calificacion: number = 0
    ) {}

    marcarComoLeido(): void {
        this.leido = true;
    }

    marcarComoPendiente(): void {
        this.leido = false;
    }

    actualizar(
        titulo: string,
        autor: string,
        anio: number,
        genero: string,
        calificacion: number
    ): void {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.genero = genero;
        this.calificacion = calificacion;
    }

    validarCalificacion(): boolean {
        return Number.isInteger(this.calificacion) &&
            this.calificacion >= 1 &&
            this.calificacion <= 5;
    }
}
