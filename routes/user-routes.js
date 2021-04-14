const {Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/userController');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { roleValido, existEmail, idExist } = require('../helpers/db-validator');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id?',[
   check('id', 'No es un Id valido').isMongoId(),
   check('id').custom(idExist),
   check('role').custom(roleValido),
   validarCampos
], usuariosPut );
 
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El password tiene que tener mas de 6 caracteres').isLength({min:6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existEmail),
    check('role').custom(roleValido),
    validarCampos
] , usuariosPost );
  
router.delete('/:id',[
  check('id','No es un id valido').isMongoId(),
  check('id').custom(idExist),
  validarCampos
],usuariosDelete );

module.exports = router;