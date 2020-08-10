
const express = require('express');

const { verificaToken } = require('../middlewares/autentication');

const app = express();

let Producto = require('../models/producto');
const producto = require('../models/producto');

// Obtener todos los productos
app.get('/producto', verificaToken, (req, res) => {
    // trae todo los productos
    //populate: usuario y categoria
    //paginado

    let desde = req.query.desde || 0
    desde = Number(desde);

    let limite = req.query.limite || 5
    limite = Number(limite);

    Producto.find({disponible: true})
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)

        .exec((err, productos) => {

            if(err){
                res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                productos
            })
        })

});

// Obtener un producto por id
app.get('/producto/:id', (req, res) => {
    //populate: usuario y categoria
    let id = req.params.id;

    Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productoDB) => {
        

        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no encontrado'
                }
            })
        }

        res.json({ 
            ok: true,
            producto: productoDB
        })
    })

});

// Buscar productos
app.get('/producto/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i'); //Esxpresion regular, la "i" lo hace insensible a las mayusculas y minisculas

    Producto.find({nombre: regex})
    .populate('categoria', 'descripcion')
    .exec( (err, productos) => {

        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            productos
        })
    })
})


// Crear un nuevo producto
app.post('/producto', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado

    let body = req.body;

    let producto = new Producto({

        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save( (err, productoDB) =>{

        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            producto: productoDB
        })
    })

});

// Actualizar el producto
app.put('/producto/:id', verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado

    let id = req.params.id;
    let body = req.body;

    Producto.findById(id, (err, productoDB) => {

        if(err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no existe'
                }
            })
        }

        productoDB.nombre = body.nombre
        productoDB.precioUni = body.precioUni
        productoDB.descripcion = body.descripcion
        productoDB.disponible = body.disponible
        productoDB.categoria = body.categoria

        productoDB.save( (err, productoSave) => {

            if(err){
                return res.status(500).json({
                    ok: false,
                    err: {
                        message: 'El producto no se actualizó'
                    }
                })
            }

            res.json({
                ok: true,
                producto: productoSave
            })
    
        })

        res.json({
            ok: true,
            producto: productoDB
        })
    })
});

// Borrar un producto
app.delete('/producto/:id', verificaToken, (req, res) => {
    
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        
        if(err){
            res.status(500).json({
                ok: false,
                err
            })
        }

        if(!productoDB){
            res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }

        productoDB.disponible = false;

        productoDB.save( (err, productDel) => {

            if(err){
                res.status(500).json({
                    ok: false,
                    err
                })
            }
            
            res.json({
                ok: true,
                producto: productDel,
                mensaje: 'Producto borrado'
            })

        })

        
    })
})






module.exports = app;