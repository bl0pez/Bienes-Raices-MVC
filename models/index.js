import Category from "./Category.js";
import Price from "./Price.js";
import Propertie from "./Propertie.js";
import User from "./User.js";

//Relacion de 1 a 1
//Se lee como: Una propiedad tiene un precio
//Price.hasOne(Propertie);

//Relacion de 1 a uno
//Category.hasOne(Propertie);

//Relacion de 1 a muchos
//Se lee como: Un usuario tiene muchas propiedades
//User.hasMany(Propertie);

Propertie.belongsTo(User);
Propertie.belongsTo(Price);
Propertie.belongsTo(Category);

export {
    Category,
    Price,
    Propertie,
    User
}