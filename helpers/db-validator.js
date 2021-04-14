
const Role = require('../models/role');
const Usuario = require('../models/user')


const roleValido = async(role = " ") =>{
    const existeRole = await Role.findOne({name: role})
    if (!existeRole) {
        throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
}

const existEmail = async (correo)=>{
    
    const emailExist = await Usuario.findOne({correo});
    if ( emailExist) {
        throw new Error(`El correo ${correo} ya está registrado en la base de datos`);
       
     }
}

const idExist = async(id)=>{
   const idExist = await Usuario.findById(id);
    if(!idExist){
        throw new Error(`El id ${id} no existe en la base de datos`);
    }
}

module.exports = {
    roleValido, existEmail, idExist
}