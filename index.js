const http = require('node:http');
const app = require('./src/app');

//Config .env
require('dotenv').config();


//config BD
require('./src/config/db');

//Server
const server = http.createServer(app); //creo el servidor y las peticiones entrantes las gestiona app
const PORT = process.env.PORT ?? 3000; //cojo el puerto del archivo .env y sino pongo el 3000
server.listen(PORT);//pongo a escuchar el server

//capturamos el evento listening y el evento error
server.on('listening', () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});

server.on('error', (error) => {
    console.log(`Error en el servidor. ${error}`);
});