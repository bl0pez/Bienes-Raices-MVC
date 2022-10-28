import { validationResult } from "express-validator";
import upload from "../middleware/subirImagen.js";
import { Propertie, Price, Category } from '../models/index.js'

export const admin = (req, res) => {
    res.render('properties/admin', {
        title: 'Mis Propiedades',
    });
}

//Vista de Crear Propiedad
export const getCreate = async (req, res) => {

    //Obtener Precios y Categorías de la base de datos
    const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()]);

    res.render('properties/crear', {
        title: 'Crear Propiedad',
        prices,
        categories,
        datos: {}
    });
}

export const postCreate = async (req, res) => {

    let resultdo = validationResult(req);

    if (!resultdo.isEmpty()) {
        const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()])

        res.render('properties/crear', {
            title: 'Crear Propiedad',

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

export const addImage = async (req, res) => {

    const { id } = req.params;

    //Validar que la propiedad exista
    const propertie = await Propertie.findByPk(id);

    if (!propertie) {
        res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if (propertie.published) {
        res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad pertenezca al usuario
    if (propertie.userId !== req.user.id) {
        res.redirect('/mis-propiedades');
    }


    res.render('properties/agregar-imagen', {
        title: 'Agregar Imagen',
        propertie,
    });

}

export const uploadImage = async (req, res, next) => {

    const { id } = req.params;

    console.log(req.file);
    //Validar que la propiedad exista
    const propertie = await Propertie.findByPk(id);

    if (!propertie) {
        res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if (propertie.published) {
        res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad pertenezca al usuario
    if (propertie.userId !== req.user.id) {
        res.redirect('/mis-propiedades');
    }


    try {

        await Propertie.update({
            image: req.file.filename,
            published: true
        }, {
            where: {
                id
            }
        });

        next();


    } catch (error) {
        console.log(error.message);
    }

}