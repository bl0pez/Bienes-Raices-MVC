import { Router } from 'express';
import { admin } from '../controllers/properties.controllers.js';

const router = Router();

router.get('/mis-propiedades', admin);

export default router;