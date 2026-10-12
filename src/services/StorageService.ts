
import { Libro } from "../models/Libro.js";

export class StorageService {
    private static readonly CLAVE = "catalogo_libros";

    static guardar(libros: Libro[]): void {
        localStorage.setItem(
            this.CLAVE,
            JSON.stringify(libros)
        );
    }

    static cargar(): Libro[] {
        const datos = localStorage.getItem(this.CLAVE);

        if (!datos) {
            return [];
        }

        try {
            const libros: unknown = JSON.parse(datos);

            if (!Array.isArray(libros)) {
                return [];
            }

            return libros.map((libro: Libro) =>
                new Libro(
                    libro.id,
                    libro.titulo,
                    libro.autor,
                    libro.anio,
                    libro.leido
                )
            );
        } catch {
            return [];
        }
    }
}
