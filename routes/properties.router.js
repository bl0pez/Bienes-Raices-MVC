import { Router } from 'express';
import { addImage, admin, deletePropertie, editPropertie, getCreate, postCreate, updatePropertie, uploadImage, viewPropertie } from '../controllers/properties.controllers.js';
import privateRouter from '../middleware/privateRouter.js';
import upload from '../middleware/subirImagen.js';
import { validateBody } from '../validations/bodyValidations.js';

const router = Router();

//Rutas publicas
router.get('/propiedades/:id', viewPropertie);

//Rutas privadas
router.use(privateRouter);

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', getCreate);
router.post('/propiedades/crear', validateBody,postCreate );

router.get('/propiedades/agregar-image/:id', addImage);
router.post('/propiedades/agregar-image/:id', upload.single('image'), uploadImage);

router.get('/propiedades/editar/:id', editPropertie);
router.post('/propiedades/editar/:id', validateBody, updatePropertie);

router.post('/propiedades/eliminar/:id', deletePropertie);


export default router;