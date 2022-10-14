import { Router } from 'express';
import { confirmAccount, create_user, login, recovertPassword, registro } from '../controllers/user.controllers.js';

const router = Router();

router.get('/login', login);

router.get('/registro', registro);
router.post('/registro', create_user);

//Confirmar cuenta por email
router.get('/confirm/:token', confirmAccount);

router.get('/recuperar-password', recovertPassword);

router.post('/', (req, res) => {

});

export default router;