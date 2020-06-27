require('./config/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose');


const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/usuario') ); //conexion a hacia las rutas 

 
  mongoose.connect('mongodb://localhost:27017/tienda', (err, res) => {
      
   if(err) throw err;

   console.log('Base de datos ONLINE');

  });

  app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto: ${process.env.PORT}`);
});


// app.listen(3000, () => {
//     console.log('Hola server');
// });