import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io'; // TODO: Paso 1: Importar libreria
import http from 'http'; // Intermediario para conexión Express <> IO
import * as socket from '../sockets/sockets';



// TODO: ! Patron SINGLETON ! Se implementará el patrón singleton en la clase SERVE para evitar que accidentalmente no se creen nuevas instancias de la clase Server.
// Se debe evitar accidentalmente abrir otras configuraciones de Sockets ( this.io )
// La implementación del patron SINGLETON asegura que solo exista una unica instancia de la clase server


export default class Server {



    private static _instance: Server; // TODO: Singleton Paso 4: Propiedad estatica se puede llamar directamente desde la clase Debe ser privado porque no se debe llamar directamente la instancia sino por medio del metodo publico instance()
    public app: express.Application;
    public port: number;
    
    public io: socketIO.Server;  // TODO: Paso 2: Crear propiedad de tipo socketIO.Server
    private httpServer: http.Server;
      
    


    private constructor() {  // TODO: Singleton Paso 1: private constructor



      this.app = express();
      this.port = SERVER_PORT;
      /* TODO: Nota -> Socket IO necesita recibir la configuración del servidor que esta corriendo
      que tecnicamente sería ( this.app ) pero Express y SIO no son compatibles directamente
      debemos usar un intermediario en este caso http 
      */
      this.httpServer = new http.Server(this.app); // TODO : Paso 3 Iniciamos un servidor http y le pasamos la configuración de Express ( this.app)
      // Por ultimo realizamos la configuración de los sockets  
      // TODO: Nota ->  Esto sería lo ideal this.io = socketIO( this.app ) pero no funciona así por eso se realiza la configuración del httpServer
      this.io = socketIO( this.httpServer ); // TODO: Paso 5: Enviamos configuración del httpServer al SocketIO

      this.escucharSockets();
    }

    // TODO: Singleton Paso 3: Creamos una metodo static ya que nos permite llamarlo directamente asiendo referencia a la clase
    // Por ejemplo public static saludar(){ ... }
    // LLamamos ese metodo estatico de la siguiente forma :  ( clase Server )  Server.saludar

    public static get instance(){

      return this._instance || ( this._instance = new this()) 
      // TODO: Singleton Paso 5: El get retorna la instancia si ya existe o si no entonces crea una nueva instancia del this.. Es decir de la misma clase
    }


    private escucharSockets(){  // Private porque es un metodo que solo se ejecutará dentro de la clase Serve

      console.log('Escuchando conexiones - sockets');

      this.io.on('connection', cliente => {  
        // Metodo ON para escuchar y le pasamos el evento 'connection' para escuchar cuando un nuevo cliente se conecte.
        // TODO: Nota -> El evento connection viene por defecto en SocketIO.
        console.log('Nuevo cliente conectado');
        
        // Desconectar
        socket.desconectar(cliente);
        socket.mensaje(cliente, this.io);



      });

    


    }

    start(callback: any) {
      // TODO : Paso 4 Levantamos el httpServe y no el Express
      this.httpServer.listen( this.port, callback );

    }
}