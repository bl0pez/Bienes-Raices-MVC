import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const privateRouter = async (req, res, next) => {

    console.log('Verificando token');

    //Verificar el token
    const { _token } = req.cookies;

    if(!_token) {
        return res.redirect('/auth/login');
    }

    //Comprobar que el token es válido
    try {

        const decoded = jwt.verify(_token, process.env.TOKEN_SECRET);
        const user = await User.scope('removeAttributes').findByPk(decoded.id);

        //Comprobar que el usuario existe
        if(!user) {
            return res.redirect('/auth/login');
        }


        req.user = user;
        return next();


    }catch(error) {
        console.log(error.message);
        return res.clearCookie('_token').redirect('/auth/login');
    }

}

export default privateRouter;