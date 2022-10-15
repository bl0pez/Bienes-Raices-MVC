import { check, validationResult } from 'express-validator';
import bcrypt from "bcryptjs";
import { sendEmail } from '../helpers/email.js';
import { generarId } from '../helpers/tokens.js';
import User from '../models/User.js';
import { generateJWT } from '../helpers/createToken.js';

export const login = (req, res) => {
    res.render('auth/login', {
        title: 'Login',
    })
}

export const authentica = async (req, res) => {
    const { email, password } = req.body;

    await check('email').isEmail().withMessage('El email no es válido').run(req);
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').run(req);

    const errores = validationResult(req);

    //Mostramos errores
    if (!errores.isEmpty()) {
        return res.render('auth/login', {
            title: 'Login',
            errors: errores.array(),
            email,
            password
        })
    }

    //Verificar si el usuario existe
    const user = await User.findOne({
        where: {email}
    });

    if (!user) {
        return res.render('auth/login', {
            title: 'Login',
            errors: [{ msg: 'El usuario no existe' }],
        })
    }

    //Verificamos que la cuenta este confirmada
    if(!user.verified){
        return res.render('auth/login', {
            title: 'Login',
            errors: [{msg:'El usuario no ha verificado su cuenta'}]
        })
    }


    //Verificar el password
    if(!user.verifyPassword(password)){
        return res.render('auth/login', {
            title: 'Login',
            errors: [{msg:'El password es incorrecto'}]
        })
    }


    //Crear el token
    const token = generateJWT(user.id)

    return res.cookie('_token', token, {
        httpOnly: true,

        //secure: process.env.NODE_ENV === 'production',
    }).redirect('/mis-propiedades');


}

export const registro = (req, res) => {
    res.render('auth/registro', {
        title: 'Crear cuenta',
    })
}

export const create_user = async (req, res) => {

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

export const resetPassword = async (req, res) => {
    //Validación de campos
    await check('email').isEmail().withMessage('Email no válido').run(req);

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('auth/recovertPassword', {
            title: 'Recuperar contraseña',
            errors: errors.array(),
        })
    }

    //Buscar el usuario por email
    const { email } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        return res.render('auth/recovertPassword', {
            title: 'Recuperar contraseña',
            errors: [{ msg: 'El email no está registrado' }],
        })
    }

    //Generar token
    user.token = generarId();
    await user.save();

    //Enviar email
    const message = `Hola ${user.name}, para recuperar tu contraseña haz click en el siguiente enlace: <a href="${process.env.URL_BACKEND}/auth/recuperar-password/${user.token}">Recuperar contraseña</a>`;

    sendEmail({
        name: user.name,
        subject: 'Recuperar contraseña',
        email: user.email,
        message,
    });


    res.render('templates/mensaje', {
        title: 'Recuperar contraseña',
        message: 'Enviamos un email a tu casilla de correo. Por favor, revisa tu bandeja de entrada y spam.',
    });


}

export const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const user = await User.findOne({
        where: { token }
    });

    if(!user){
        return res.render('auth/confirmar-cuenta', {
            title: 'Error al confirmar cuenta',
            message: 'Hubo un error al confirmar tu cuenta. Por favor, intenta nuevamente.',
            error: true,
        })
    }

    //Mostrar formulario para cambiar contraseña
    res.render('auth/reset-password', {
            title: 'Cambiar contraseña',
    })

}


export const newPassword = async (req, res) => {

    //Validar password
    await check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').run(req);
    await check('password2').equals(req.body.password).withMessage('Las contraseñas no coinciden').run(req);

    let errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.render('auth/reset-password', {
            title: 'Cambiar contraseña',
            errors: errors.array(),
        })
    }

    const { token } = req.params;
    const { password } = req.body;

    //Buscar el usuario por token
    const user = await User.findOne({
        where: { token }
    });

    if(!user){
        return res.render('auth/confirmar-cuenta', {
            title: 'Error al confirmar cuenta',
            message: 'Hubo un error al confirmar tu cuenta. Por favor, intenta nuevamente.',
            error: true,
        })
    }

    //Hashear el password
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    user.token = null;
    await user.save();

    res.render('auth/confirmar-cuenta', {
        title: 'Password Restablecido',
        message: 'Tu contraseña ha sido cambiada. Ya puedes iniciar sesión.',
    })

}