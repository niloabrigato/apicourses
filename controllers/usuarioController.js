import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import { emailRegistro } from "../helpers/email.js"

const registrar = async ( req, res ) => {
    // evitar registros duplicados
    const {email} = req.body
    const existeUsuario = await Usuario.findOne({email})

    if (existeUsuario){
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        await usuario.save()

        // Enviar email de confirmación
        const { email, nombre, token } = usuario
        
        emailRegistro({ email, nombre, token })

        res.json({ msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar tu cuenta"})
    } catch (error) {
        console.log(error)
    }   
}

const autenticar = async (req, res) => {
    const { email, password } = req.body

    // Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    // Comprobar si el usuario está confirmado
    if (!usuario.confirmado){
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({msg: error.message})
    }

    // Comprobar si la password es correcta
    if ( await usuario.comprobarPassword ( password ) ) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id)
        })
    } else {
        const error = new Error("El password es incorrecto")
        return res.status(403).json({msg: error.message})
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token })

    if(!usuarioConfirmar){
        const error = new Error("Token no válido")
        return res.status(403).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = ''
        await usuarioConfirmar.save()
        res.json({ msg: "Usuario confirmado correctamente"})

    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params

    const tokenValido = await Usuario.findOne({ token })

    if(tokenValido){
        res.json({msg: "Token válido y el usuario existe"})
    } else {
        const error = new Error("Token no válido")
        return res.status(404).json({msg: error.message})
    }
}

const perfil = async (req, res) => {
    const { usuario } = req

    res.json(usuario)
}

export {
    registrar,
    autenticar,
    confirmar,
    comprobarToken,
    perfil
}