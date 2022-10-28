import { Router } from 'express';
import { addImage, admin, getCreate, postCreate, uploadImage } from '../controllers/properties.controllers.js';
import privateRouter from '../middleware/privateRouter.js';
import upload from '../middleware/subirImagen.js';
import { validateBody } from '../validations/bodyValidations.js';

const router = Router();

router.use(privateRouter);

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', getCreate);
router.post('/propiedades/crear', validateBody,postCreate );

router.get('/propiedades/agregar-image/:id', addImage);
router.post('/propiedades/agregar-image/:id', upload.single('image'), uploadImage);

export default router;