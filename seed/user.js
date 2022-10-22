import bcrypt from 'bcryptjs';

const user = [
    {
        name: 'prueba',
        email: 'prueba@gmail.com',
        verified: 1,
        password: bcrypt.hashSync('123456', 10),
    }
]

export default user;