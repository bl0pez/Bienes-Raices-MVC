import { Router } from 'express';
import { admin, getCreate, postCreate } from '../controllers/properties.controllers.js';
import { validateBody } from '../validations/bodyValidations.js';

const router = Router();

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', getCreate);
router.post('/propiedades/crear', validateBody,postCreate )

export default router;