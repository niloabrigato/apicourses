import  express  from "express"
import { 
    registrar, 
    autenticar,
    confirmar,
    comprobarToken,
    perfil
} from "../controllers/usuarioController.js"

import checkAuth from "../middleware/checkAuth.js"

const router = express.Router()

/** Autenticación, Registro y Confirmación de Ususarios */
router.post( "/", registrar ) // Crea un nuevo usuario
router.post( "/login", autenticar ) 
router.get('/confirmar/:token', confirmar)
router.get("/perfil", checkAuth, perfil)

export default router