export const admin = (req, res) => {
    res.render('properties/admin', {
        title: 'Mis Propiedades',
        isLogin: true,
    });
}

//Vista de Crear Propiedad
export const getCreate = (req, res) => {
    res.render('properties/crear', {
        title: 'Crear Propiedad',
        isLogin: true,
    });
}

export const postCreate = (req, res) => {
    res.send('Post Create');
}