import { exit } from "node:process";
import categories from './categories.js';
import dbConfig from '../config/dbConfig.js';
import prices from "./prices.js";

import { Category, Price, Propertie, User } from '../models/index.js';
import user from "./user.js";

const seed = async () => {
    try {
        //authenticate
        await dbConfig.authenticate();
        //generar las columnas de la tabla
        await dbConfig.sync();

        //Insertar datos en la tabla
        await Promise.all(
            [
                Price.bulkCreate(prices),
                Category.bulkCreate(categories),
                User.bulkCreate(user)
            ]
        );

        console.log('Datos insertados correctamente');
        exit();

    } catch (error) {
        console.log('Algo salió mal al insertar los datos');
        console.log(error.message);
        exit(1);
    }
}

const removeSeed = async () => {
    try {

        await dbConfig.authenticate();

        await dbConfig.sync({ force: true });

        await Promise.all([
            Propertie.destroy({ truncate: true, cascade: true }),
            Category.destroy({ where: {}, truncate: true }),
            Price.destroy({ where: {}, truncate: true }),
            User.destroy({ where: {}, truncate: true })
        ]);

        console.log('Datos eliminados correctamente');
        exit();
    } catch (error) {
        console.log('Algo salió mal al eliminar los datos');
        console.log(error.message);
        exit(1);
    }
}

if (process.argv[2] === "-i") {
    seed();
}

if (process.argv[2] === "-e") {
    removeSeed();
}

// npm run db:import -i se ejecuta para insertar datos
// npm run db:destroy -e se ejecuta para eliminar datos