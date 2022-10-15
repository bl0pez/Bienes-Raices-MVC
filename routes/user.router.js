import { Router } from 'express';
import { authentica, comprobarToken, confirmAccount, create_user, login, newPassword, recovertPassword, registro, resetPassword } from '../controllers/user.controllers.js';

const router = Router();

router.get('/login', login);
router.post('/login', authentica);

router.get('/registro', registro);
router.post('/registro', create_user);

//Confirmar cuenta por email
router.get('/confirm/:token', confirmAccount);

router.get('/recuperar-password', recovertPassword);
router.post('/recuperar-password', resetPassword);
router.get('/recuperar-password/:token', comprobarToken);
router.post('/recuperar-password/:token', newPassword);

export default router;