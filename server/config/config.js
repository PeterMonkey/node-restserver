//Creando un archivo de configuracion global

//===========================================
// Puerto
//===========================================
process.env.PORT = process.env.PORT || 3000;

//===========================================
// Entorno
//===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===========================================
// Vencimiento de token
//===========================================
process.env.CADUCIDAD_TOKEN = '48h';


//===========================================
// SEED
//===========================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//===========================================
// Base de datos
//===========================================
let urlDB;

// if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/tienda'
// } else {
//    urlDB =  process.env.MONGO_URI
// }

process.env.URLDB = urlDB;

//===========================================
// Google Client ID
//===========================================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1058456447228-bjk3k9de0bf1n2ogf62ku16vqqibju2v.apps.googleusercontent.com'
