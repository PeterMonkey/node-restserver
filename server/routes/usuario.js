const express = require('express')
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express()
const Ususario = require('../models/usuario');
const usuario = require('../models/usuario');



app.get('/usuario', (req, res) => {
    
   let desde = req.query.desde || 0; // Si no especifica desde donde comienza, lo haces desde 0
   desde = Number(desde); 

   let limite =req.query.limite || 5; // Si no especifica el numero de registro, llega hasta 5
   limite =Number(limite);

  Ususario.find({state: true}, 'nombre email role state google img') // Filtrando los resultados
     .skip(desde) //Salta a los siguentes registros
     .limit(limite) //Manda solo un numero de registros
     
     .exec( (err, usuarios ) => {

      if(err){
        return res.status(400).json({
          ok: false,
          err
        })
      }

      usuario.count({state: true}, (err, conteo) => {


        res.json({
          pk: true,
          usuarios,
          cuantos: conteo
        });
  

      });

    

      
     });


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
      let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado'] ); //Regresa una copia del objeto filtrando solo los valores que yo quiero


      Ususario.findByIdAndUpdate( id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        
        if(err){
          return res.status(400).json({
            ok: false,
            err
          });
        }

         res.json({ 
            ok: true,
            usuario: usuarioDB
          })

      })
  
      
  })
  
  app.delete('/usuario/:id', (req, res) => {

          let id = req.params.id;
          let changeState = {
            state: false
          }

          Ususario.findByIdAndUpdate(id, changeState, {new: true}, (err, userDel) => {
            
            if(err){
                    return res.status(400).json({
                      ok: false,
                      err
                    });
                  }

            if({state: false}){
                return res.status(400).json({
                  ok: false,
                  err: {
                    message: 'Usuario no encontrado'
                  }
                });
              }

              res.json({
                ok: true,
                usuario: userDel
              })
          
          })
     
           //Eliminando fisicamente: que deje de existir el registro
          //   Ususario.findByIdAndRemove(id, (err, userDel) => {

          //     if(err){
          //       return res.status(400).json({
          //         ok: false,
          //         err
          //       });
          //     }

          //     if(!userDel){
          //       return res.status(400).json({
          //         ok: false,
          //         err: {
          //           message: 'Usuario no encontrado'
          //         }
          //       });
          //     }

          //     res.json({
          //       ok: true,
          //       usuario: userDel
          //     })
          // })

      
    })

module.exports = app;    