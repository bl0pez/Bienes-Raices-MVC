import { Router } from 'express';
import { admin, getCreate } from '../controllers/properties.controllers.js';

const router = Router();

router.get('/mis-propiedades', admin);

router.get('/propiedades/crear', getCreate);
router.post('/propiedades/crear', )

export default router;