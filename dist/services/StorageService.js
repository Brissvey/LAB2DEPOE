import { Libro } from "../models/Libro.js";
export class StorageService {
    static guardar(libros) {
        localStorage.setItem(this.CLAVE, JSON.stringify(libros));
    }
    static cargar() {
        const datos = localStorage.getItem(this.CLAVE);
        if (!datos) {
            return [];
        }
        try {
            const libros = JSON.parse(datos);
            if (!Array.isArray(libros)) {
                return [];
            }
            return libros.map((libro) => new Libro(libro.id, libro.titulo, libro.autor, libro.anio, libro.leido));
        }
        catch {
            return [];
        }
    }
}
StorageService.CLAVE = "catalogo_libros";
