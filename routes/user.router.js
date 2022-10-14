import { Router } from 'express';
import { create_user, login, recovertPassword, registro } from '../controllers/user.controllers.js';

const router = Router();

router.get('/login', login);

router.get('/registro', registro);
router.post('/registro', create_user);

router.get('/recuperar-password', recovertPassword);

router.post('/', (req, res) => {

});

export default router;