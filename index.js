import express from "express";

import dbConfig from './config/dbConfig.js';
import userRouter from './routes/user.router.js';
import propertiesRouter from './routes/properties.router.js';


const app = express();
const port = process.env.PORT || 3000;

//habilitar lectura de datos
app.use(express.urlencoded({ extended: true }));

//Conexión a la base de datos
dbConfig.authenticate()
    dbConfig.sync()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log('Error al conectar la base de datos'));

//habilitar pug
app.set('view engine', 'pug');
app.set('views', './views');

//habilitar carpeta publica
app.use(express.static('public'));


//Routung
app.use('/auth', userRouter);
app.use('/', propertiesRouter);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


