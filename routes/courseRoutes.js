import express from 'express'

import {
    obtenerCourses,
    nuevoCourse,    
    obtenerCourse,    
    editarCourse,    
    eliminarCourse,
} from '../controllers/courseController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router
    .route('/')
    .get(checkAuth, obtenerCourses)
    .post(checkAuth, nuevoCourse)

router
    .route('/:id')
    .get(checkAuth, obtenerCourse)
    .put(checkAuth, editarCourse)
    .delete(checkAuth, eliminarCourse)    

export default router