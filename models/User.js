import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import dbConfig from "../config/dbConfig.js";

const User = dbConfig.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        message: 'Name is required'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        message: 'Email is required'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        message: 'Password is required'
    },
    token: DataTypes.STRING,
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    hooks: {
        beforeCreate: function(user){
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);
        }
    }
});


//Método para verificar password
User.prototype.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

export default User;