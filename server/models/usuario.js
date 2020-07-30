const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'], //Valores permitidos
    message: '{VALUE} no es un rol valido'
}

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true, // El campo de email es unico
        required: [true, 'El email es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// excluye la contraseña del token
usuarioSchema.methods.toJSON = function() { // se usa 'function' y no '=>', por que se utiliza el this
    let user = this; //lo que sea que tenga en ese momento
    let userObject = user.toObject(); //toma el objeto del usuario

    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico'}) // Se le dice que use es plugin

module.exports = mongoose.model('Usuario', usuarioSchema);