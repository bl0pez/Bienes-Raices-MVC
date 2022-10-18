import Category from "../models/Category.js";
import Price from "../models/Price.js";

export const admin = (req, res) => {
    res.render('properties/admin', {
        title: 'Mis Propiedades',
        isLogin: true,
    });
}

//Vista de Crear Propiedad
export const getCreate = async(req, res) => {

    //Obtener Precios y Categorías de la base de datos
    const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()])

    res.render('properties/crear', {
        title: 'Crear Propiedad',
        isLogin: true,
        prices,
        categories,
    });
}

export const postCreate = (req, res) => {
    res.send('Post Create');
}