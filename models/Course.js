import mongoose from "mongoose"

const coursesSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
},
{
    timestamps: true
})

const Course = mongoose.model("Course", coursesSchema)

export default Course