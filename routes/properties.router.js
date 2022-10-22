import { Router } from 'express';
import { admin, getCreate, postCreate } from '../controllers/properties.controllers.js';
import privateRouter from '../middleware/privateRouter.js';
import { validateBody } from '../validations/bodyValidations.js';

const router = Router();

router.get('/mis-propiedades', privateRouter, admin);

router.get('/propiedades/crear', getCreate);
router.post('/propiedades/crear', validateBody,postCreate )

export default router;