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

 
  mongoose.connect(process.env.URLDB, {useNewUrlParser: true, useCreateIndex: true})
            .then(mongoose => console.log('BD en linea'))
            .catch(err => console.log(err));

  app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto: ${process.env.PORT}`);
});


// app.listen(3000, () => {
//     console.log('Hola server');
// });