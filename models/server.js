const express = require('express');
const cors = require('cors');
const {
    json
} = require('express');
const {
    dbConexion
} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios';
        //Conectar a bases de datos
        this.conectarDB();
        //Middleware
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDB() {
        await dbConexion()
    }
    middlewares() {
        //COSRS, Poder definir de las direcciones http que peuden hacer peticiones al servidor 
        this.app.use(cors());

        //Parseo y lectura de body
        this.app.use(json());

        // Utilizar Directorio publico para mostrar vistas
        this.app.use(express.static('public'));
    }

    routes() {
        //Definir las rutas y el controlador
        this.app.use(this.usuarioPath, require('../routes/user-routes'))
    }
    listen() {
        //Crear la comunicacion de expresss
        this.app.listen(this.port, () => {
            console.log(`App running at https://localhost:${this.port}`);
        });
    }

}

module.exports = Server;