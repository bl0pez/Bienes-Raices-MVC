import express from "express";
import cookieParser from "cookie-parser";


import userRouter from './routes/user.router.js';
import propertiesRouter from './routes/properties.router.js';
import { dbConnection } from "./config/dbConfig.js";


const app = express();
const port = process.env.PORT || 3000;
app.use(cookieParser());

//habilitar lectura de datos
app.use(express.urlencoded({ extended: true }));

//Conexión a la base de datos
dbConnection();

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


