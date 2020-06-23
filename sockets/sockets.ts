import { Socket } from "socket.io";




// Escuchar Cliente se desconecta de la aplicación
export const desconectar = ( cliente: Socket) => {

  cliente.on('disconnect', () => {

      console.log('Cliente desconectado');
  })


}


// Escuchar Mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {

  cliente.on('mensaje', ( payload: {de: string, cuerpo: string}) => {

      console.log('Recibiendo Mensaje', payload);
      io.emit('mensaje-nuevo', payload);
  })


}