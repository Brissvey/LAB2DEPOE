import { LibroView } from "./views/LibroView.js";
import { LibroController } from "./controllers/LibroController.js";
document.addEventListener("DOMContentLoaded", () => {
    const vista = new LibroView();
    new LibroController(vista);
});
