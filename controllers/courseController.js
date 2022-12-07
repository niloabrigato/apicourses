import Course from '../models/Course.js'

const obtenerCourses = async (req, res) => {
    const courses = await Course.find().where('creador').equals(req.usuario)

    res.json(courses)
}

const nuevoCourse = async (req, res) => {
    console.log(req.usuario)
    const course = new Course(req.body)
    course.creador = req.usuario._id

    try {
        const courseAlmacenado = await course.save()
        res.json(courseAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const obtenerCourse = async (req, res) => {
    const { id } = req.params

    const course = await Course.findById(id)

    if(!course) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( course.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error("Acción no válida")
        return res.status(401).json({msg: error.message})
    }
}

const editarCourse = async (req, res) => {
    const { id } = req.params

    const course = await Course.findById(id)

    if(!course) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( course.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error("Acción no válida")
        return res.status(401).json({msg: error.message})
    }

    course.nombre = req.body.nombre || course.nombre
    course.descripcion = req.body.descripcion || course.descripcion
    course.fechaEntrega = req.body.fechaEntrega || course.fechaEntrega
    course.cliente = req.body.cliente || course.cliente

    try {
        const courseAlmacenado = await course.save()
        res.json(courseAlmacenado)
    } catch (error) {
        console.log(error)
    }

}

const eliminarCourse = async (req, res) => {
    const { id } = req.params

    const course = await Course.findById(id)

    if(!course) {
        const error = new Error("No encontrado")
        return res.status(404).json({msg: error.message})
    }

    if ( course.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error("Acción no válida")
        return res.status(401).json({msg: error.message})
    }

    try {
        await course.deleteOne()
        res.json({ msg: "Curso eliminado" })
    } catch (error) {
        console.log(error)
    }
}

export {
    obtenerCourses,
    nuevoCourse,    
    obtenerCourse,    
    editarCourse,    
    eliminarCourse    
}