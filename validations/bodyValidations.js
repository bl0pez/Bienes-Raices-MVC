import { body } from "express-validator";



export const validateBody = [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('description').notEmpty().withMessage('La descripción es obligatoria')
     .isLength({ max: 200 }).withMessage('La descripción no puede tener más de 200 caracteres'),
    body('category').isNumeric().withMessage('La categoría es obligatoria'),
    body('price').notEmpty().withMessage('Seleccione un rango de precios'),
    body('rooms').notEmpty().withMessage('La cantidad de habitaciones es obligatoria'),
    body('parking').notEmpty().withMessage('La cantidad de estacionamientos es obligatoria'),
    body('wc').notEmpty().withMessage('La cantidad de baños es obligatoria'),
    body('address').notEmpty().withMessage('La dirección es obligatoria'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    body('lng').notEmpty().withMessage('Ubica la propiedad en el mapa'),
]