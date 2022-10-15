import jwt from "jsonwebtoken";

export const generateJWT = ({ id }) => {
    //Autenticar al usuario
   jwt.sign({
        id: id,
    }, 
    process.env.TOKEN_SECRET, 
    {
        expiresIn: '1d',
    });

}