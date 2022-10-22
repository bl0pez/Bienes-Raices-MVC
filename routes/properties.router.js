import { Router } from 'express';
import { addImage, admin, getCreate, postCreate } from '../controllers/properties.controllers.js';
import privateRouter from '../middleware/privateRouter.js';
import { validateBody } from '../validations/bodyValidations.js';

const router = Router();

router.use(privateRouter);

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', getCreate);
router.post('/propiedades/crear', validateBody,postCreate );

router.get('/propiedades/agregar-imagen/:id', addImage);

export default router;