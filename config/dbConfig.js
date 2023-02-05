import Sequelize from "sequelize";
import loadEnv from "../helpers/env.js";

// Load environment variables
loadEnv();

// const dbConfig = new Sequelize({
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "root",
//     database: "vienesRaices",
//     define:{
//         timestamps: true
//     },
//     pool:{
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     },
//     logging: false
// });

export const dbConfig = new Sequelize({
    dialect: "mysql",
    host: "db",
    port: 3306,
    username: "root",
    password: "password",
    database: "vienesRaices",
    define:{
        timestamps: true
    },
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    //logging: false
});

export const dbConnection = async () => {
    try{

        await dbConfig.authenticate();
        console.log('Base de datos conectada');

    }catch(error){
        console.log('Error al conectar la base de datos');
        console.log(error);
    }
}