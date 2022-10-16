import { DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const Price = dbConfig.define("price", {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "El precio es obligatorio",
            },
        },
    }
});

export default Price;