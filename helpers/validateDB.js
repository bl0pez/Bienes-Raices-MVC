import User from '../models/User.js';


/**
 * Revisa si el email existe en la base de datos
 * @param {*} email 
 * @returns 
 */
const emailExist = async(email) => {

    const existEmail =  await User.findOne({
        where: {email}
    });

    if (existEmail) {
        throw new Error(`El email ${email} ya esta registrado`);
    }

}

export {
    emailExist,
}