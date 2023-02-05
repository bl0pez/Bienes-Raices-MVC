import { dbConfig } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Category = dbConfig.define('category', {
    name:{
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nombre es obligatorio',
            },
        }
    }
});

export default Category;