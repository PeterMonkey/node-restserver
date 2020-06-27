const express = require('express')
const bcrypt = require('bcrypt');

const app = express()
const Ususario = require('../models/usuario')



app.get('/usuario', (req, res) => {
    res.json('get usuario LOCAL!!!')
  })
  
  //El post se usa para crear nuevos registros
  app.post('/usuario', (req, res) => {
  
      let body = req.body;

      let usuario = new Ususario({ //Crea al usuario
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10), //hashSync es para que haga el hash de forma sincrona
        role: body.role
      })


      usuario.save( (err, usuarioDB) => {  //Guarda al usuario en la BD
        if(err){
          return res.status(400).json({
            ok: false,
            err
          })
        }

        // usuarioDB.password = null; //no mostrar el hash

        res.json({
          ok: true,
          usuario: usuarioDB
        })
      })

  
      
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

module.exports = app;    