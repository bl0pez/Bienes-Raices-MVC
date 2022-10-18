import { DataTypes } from "sequelize";
import dbConfig from "../config/dbConfig.js";

const Propertie = dbConfig.define('propertie', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El titulo es obligatorio',
            },
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La descripción es obligatoria',
            },
        }
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El número de habitaciones es obligatorio',
            },
        }
    },
    street: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La calle es obligatoria',
            },
        }
    },
    lat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La latitud es obligatoria',
            },
        }
    },
    lng:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La longitud es obligatoria',
            },
        }
    },
    Image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'La imagen es obligatoria',
            },
        }
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});


export default Propertie;
