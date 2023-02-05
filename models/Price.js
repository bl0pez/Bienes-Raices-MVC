import { dbConfig } from "../config/dbConfig.js";
import { DataTypes } from "sequelize";

const Price = dbConfig.define("price", {
    price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El precio es obligatorio",
            },
        },
    }
});

export default Price;