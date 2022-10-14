import { check, validationResult } from 'express-validator';
import { generarId } from '../helpers/tokens.js';
import User from '../models/User.js';

export const login = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
    })
}

export const registro = (req, res) => {
    res.render('auth/registro', {
        title: 'Crear cuenta',
    })
}

export const create_user = async (req, res) => {

    console.log(req.body);

    //validación de campos
    await check('name').notEmpty().withMessage('El nombre es obligatorio').run(req);
    await check('email').isEmail().withMessage('Email no válido').run(req);
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').run(req);
    await check('password2').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('auth/registro', {
            title: 'Crear cuenta',
            errors: errors.array(),
            user: {
                name: req.body.name,
                email: req.body.email,
            }
        })
    }

    const { name, email, password } = req.body;

    //validar que el email no esté registrado
    const emailExists = await User.findOne({
        where: {
            email
        }
    });

    if (emailExists) {
        return res.render('auth/registro', {
            title: 'Crear cuenta',
            errors: [{ msg: 'El email ya está registrado' }],
            user: {
                name,
                email,
            }
        })
    }


    await User.create({name, email, password, token:generarId()});

    res.render('templates/mensaje', {
        title: 'Registro exitoso',
        message: 'Enviamos un email de confirmación a tu casilla de correo. Por favor, revisa tu bandeja de entrada y spam.',
    })
}

export const recovertPassword = (req, res) => {
    res.render('auth/recovertPassword', {
        title: 'Recuperar contraseña',
    })
}