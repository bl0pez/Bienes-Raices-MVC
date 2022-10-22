import { validationResult } from "express-validator";
import { Propertie, Price, Category } from '../models/index.js'

export const admin = (req, res) => {
    res.render('properties/admin', {
        title: 'Mis Propiedades',
        isLogin: true,
    });
}

//Vista de Crear Propiedad
export const getCreate = async(req, res) => {

    //Obtener Precios y Categorías de la base de datos
    const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()]);

    res.render('properties/crear', {
        title: 'Crear Propiedad',
        isLogin: true,
        prices,
        categories,
        datos: {}
    });
}

export const postCreate = async(req, res) => {
    
    let resultdo = validationResult(req);

    if(!resultdo.isEmpty()){
        const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()])

        res.render('properties/crear', {
            title: 'Crear Propiedad',
            isLogin: true,
            prices,
            categories,
            errors: resultdo.array(),
            datos: req.body
        });

    }

    const { title, description, address, category: categoryId, price, rooms, wc, parking, lat, lng } = req.body;


    try {
        
        const propertie = await Propertie.create({
            title,
            description,
            rooms,
            parking,
            wc,
            address,
            lat,
            lng,
            categoryId,
            priceId: price,
            userId: req.user.id,
            image: 'aaaaapng'
        });

        const { id } = propertie;

        res.redirect(`/propiedades/agregar-image/${id}`);


    } catch (error) {
        console.log(error.message);
    }
    

}

export const addImage = async(req, res) => {

    

}