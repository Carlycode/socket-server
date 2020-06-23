import Server from "./class/server";
import router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

// TODO: Singleton Paso 2 -> Al convertir el contructor private ya no se puede instanciar la clase de esta forma 'const server = new Server();'  ( Usando NEW )
// Solo propiedades o metodos internas en la clase podran llamar al constructor

const server = Server.instance;  // TODO: Singleton Paso 6: usamos el metodo estatico para instanciar

server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());
server.app.use( cors({origin: true, credentials: true}));


server.app.use('/', router);

server.start( () => {
  
  console.log(`Servidor corriendo en el puerto ${server.port}`);

})