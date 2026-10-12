
export class Libro {
    constructor(
        public id: number,
        public titulo: string,
        public autor: string,
        public anio: number,
        public leido: boolean = false
    ) {}

    marcarComoLeido(): void {
        this.leido = true;
    }

    marcarComoPendiente(): void {
        this.leido = false;
    }
}
