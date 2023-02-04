import { unlink } from 'node:fs';
import { validationResult } from "express-validator";
import { Propertie, Price, Category } from '../models/index.js'

export const admin = async (req, res) => {

    const { id } = req.user;

    const properties = await Propertie.findAll({
        where: {
            userId: id
        },
        include: [{
            model: Category, as: 'category',
        },
        {
            model: Price, as: 'price',
        }]
    });


    res.render('properties/admin', {
        title: 'Mis Propiedades',
        properties
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

        return;

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
            image: "noImage.jpg",
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
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if (propertie.published) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad pertenezca al usuario
    if (propertie.userId !== req.user.id) {
        return res.redirect('/mis-propiedades');
    }


    res.render('properties/agregar-imagen', {
        title: 'Agregar Imagen',
        propertie,
    });

}

export const uploadImage = async (req, res, next) => {

    const { id } = req.params;

    //Validar que la propiedad exista
    const propertie = await Propertie.findByPk(id);

    if (!propertie) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad no este publicada
    if (propertie.published) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad pertenezca al usuario
    if (propertie.userId !== req.user.id) {
        return res.redirect('/mis-propiedades');
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

export const editPropertie = async (req, res) => {
    
        const { id } = req.params;

        const propertie = await Propertie.findByPk(id);

        if (!propertie) {
            return res.redirect('/mis-propiedades');
        }

        //Validar que sea el usuario que creo la propiedad
        if (propertie.userId.toString() !== req.user.id.toString()) {
            return res.redirect('/mis-propiedades');
        }

        const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()]);


        res.render('properties/editar', {
            title: 'Actualizar Propiedad',
            prices,
            categories,
            datos: propertie
        });

        return;


}

export const updatePropertie = async (req, res) => {


    let resultdo = validationResult(req);

    if (!resultdo.isEmpty()) {
        const [prices, categories] = await Promise.all([Price.findAll(), Category.findAll()])

        res.render('properties/editar', {
            title: 'Editar Propiedad',
            prices,
            categories,
            errors: resultdo.array(),
            datos: req.body
        });

        return;

    }

    const { id } = req.params;

    const propertie = await Propertie.findByPk(id);

    if (!propertie) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que sea el usuario que creo la propiedad
    if (propertie.userId.toString() !== req.user.id.toString()) {
        return res.redirect('/mis-propiedades');
    }

    const { title, description, address, category: categoryId, price, rooms, wc, parking, lat, lng } = req.body;

    try {
        await propertie.set({
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
        });

        await propertie.save();

        res.redirect('/mis-propiedades');


    } catch (error) {
        console.log(error.message);
    }

}



export const deletePropertie = async (req, res) => {
    const { id } = req.params;

    const propertie = await Propertie.findByPk(id);

    if (!propertie) {
        return res.redirect('/mis-propiedades');
    }

    //Validar que la propiedad sea del usuario
    if (propertie.userId.toString() !== req.user.id.toString()) {
        return res.redirect('/mis-propiedades');
    }


    //Eliminar la propiedad
    try {
        await propertie.destroy();
        res.redirect('/mis-propiedades');

        //Eliminar la imagen
        if(propertie.image !== "noImage.jpg"){
            unlink(`public/uploads/${propertie.image}`, (err) => {
                if (err) throw err;
                console.log('Imagen Eliminada');
            });

            return;
        }

    } catch (error) {
        console.log(error.message);
    }   

}

export const viewPropertie = async (req, res) => {
    
}