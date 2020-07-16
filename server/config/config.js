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
// Base de datos
//===========================================
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/tienda'
} else {
   urlDB = 'mongodb://strike:FQX0zt7hNJYJr3IR@cluster0-shard-00-00.5ldh1.mongodb.net:27017,cluster0-shard-00-01.5ldh1.mongodb.net:27017,cluster0-shard-00-02.5ldh1.mongodb.net:27017/test?replicaSet=atlas-sl9qhj-shard-0&ssl=true&authSource=admin'
}

process.env.URLDB = urlDB;

