import { Router } from 'express';
import { check } from 'express-validator';
import { authentica, comprobarToken, confirmAccount, create_user, login, newPassword, recovertPassword, registro, resetPassword } from '../controllers/user.controllers.js';
import { emailExist } from '../helpers/validateDB.js';
import { validateFields } from '../middleware/validateFields.js';

const router = Router();

router.get('/login', login);
router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
],authentica);

router.get('/registro', registro);
router.post('/registro', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password2', 'Los passwords deben coincidir').custom((value, { req }) => value === req.body.password),
    check('email').custom(emailExist),
    validateFields,
],create_user);

//Confirmar cuenta por email
router.get('/confirm/:token', confirmAccount);

router.get('/recuperar-password', recovertPassword);
router.post('/recuperar-password', resetPassword);
router.get('/recuperar-password/:token', comprobarToken);
router.post('/recuperar-password/:token', newPassword);

export default router;