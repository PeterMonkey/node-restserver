require('./config/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

 
app.get('/usuario', (req, res) => {
  res.json('get usuario')
})

//El post se usa para crear nuevos registros
app.post('/usuario', (req, res) => {

    let body = req.body;

    if(body.nommre === undefined) {

      res.status(400).json({   // Esta funcion retorna el codigo de respuesta

            OK: false,
            mensaje: 'El nombre es necesario'
      });
          
    }else {
      res.json({
        persona: body
     })
    }

    
  })

  //El put se utiliza para actualizar registros
app.put('/usuario/:id', (req, res) => {

    let id = req.params.id; //Retorne lo que sea que coloque en el url

    res.json({
        id
    })
})

app.delete('/usuario', (req, res) => {
    res.json('delete usuario')
  })
 
 
  app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto: ${process.env.PORT}`);
});


// app.listen(3000, () => {
//     console.log('Hola server');
// });