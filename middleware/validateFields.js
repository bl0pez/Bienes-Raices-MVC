import { check, validationResult } from 'express-validator';

const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    //Contruccion de la vista
    const route = req.originalUrl.split('/')[1] + '/' + req.originalUrl.split('/')[2];

    if (!errors.isEmpty()) {
        return res.render(route, {
            errors: errors.array(),
            ...req.body
        });
    }

    next();

}

export {
    validateFields
}