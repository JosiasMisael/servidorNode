const {response, request} = require('express');
const Usuario = require('../models/user')
const bcrypt = require('bcryptjs');


const usuariosGet = async (req = request, res = response)=>{
    const {limite = 15, desde = 0} = req.query;
    const query= { status: true};

    const [ total , usuarios] =await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);
    res.json({
       total,
       usuarios
    });
}
const usuariosPost = async(req, res = response)=>{
    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password ,salt);
    //Guardar en DB
    await usuario.save();
    res.json(usuario);
}
const usuariosPut = async (req, res = response)=>{
    const id = req.params.id;
    const {_id,  password,correo, google, ...resto} = req.body;
    if ( password) {
        //Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    resto.password = bcrypt.hashSync(password ,salt);   
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
        res.json(usuario);
    
}
const usuariosDelete =async (req, res =response)=>{
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {status: false});
    res.json(usuario);
}

module.exports = {
    usuariosGet, usuariosPost, usuariosPut, usuariosDelete
}
