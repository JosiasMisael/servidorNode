const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
  name: {
      type: String,
      required: [true, 'El Rol es Obligatorio']
  }

});

module.exports = model('Role',RoleSchema);