import { check, validationResult } from 'express-validator';
import { sendEmail } from '../helpers/email.js';
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

    const user = await User.create({name, email, password, token:generarId()});

    const message = `Hola ${user.name}, gracias por registrarte en Bienes Raices. Para activar tu cuenta haz click en el siguiente enlace: <a href="${process.env.URL_BACKEND}/auth/confirm/${user.token}">Confirmar cuenta</a>`;

    //Enviar email de confirmación
    sendEmail({
        name: user.name,
        subject: 'Confirma tu cuenta',
        email: user.email,
        token: user.token,
        message,
    });


    res.render('templates/mensaje', {
        title: 'Registro exitoso',
        message: 'Enviamos un email de confirmación a tu casilla de correo. Por favor, revisa tu bandeja de entrada y spam.',
    })
}

export const confirmAccount = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        where: { token }
    });

    if (!user) {
        return res.render('auth/confirmar-cuenta', {
            title: 'Error al confirmar cuenta',
            message: 'Hubo un error al confirmar tu cuenta. Por favor, intenta nuevamente.',
            error: true,
        })
    }

    //Actualizar el usuario romoviendo el token y activando la cuenta
    user.token = null;
    user.activo = 1;
    await user.save();

    res.render('auth/confirmar-cuenta', {
        title: 'Cuenta confirmada',
        message: 'Tu cuenta ha sido confirmada. Ya puedes iniciar sesión.',
        error: false,
    });

}

export const recovertPassword = (req, res) => {
    res.render('auth/recovertPassword', {
        title: 'Recuperar contraseña',
    })
}