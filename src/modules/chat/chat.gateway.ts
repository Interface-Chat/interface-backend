import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { IsNotEmpty, IsString } from 'class-validator';
import { Socket, Server } from 'socket.io';
import { WebsocketsExceptionFilter } from './ws-exception.filter';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  nickname: string;
  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('text-chat')
  @UsePipes(new ValidationPipe())
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() _client: Socket,
  ) {
    this.server.emit('text-chat', {
      ...message,
      time: new Date().toDateString(),
    });
  }
}




// import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// @WebSocketGateway()
// export class ChatGateway {
//   @WebSocketServer()
//     server: Server;
//     // listen for send_message events
//     @SubscribeMessage('send_message')
//     listenForMessages(@MessageBody() message: string) {
//       this.server.sockets.emit('receive_message', message);
//     }
//   // @SubscribeMessage('message')
//   // onNewMessage(@MessageBody() data: any): string {
//   //   // Handle incoming messages and broadcast them to clients
//   //   console.log("connected");
//   //   console.log(data);
    
    
//   //   return "fine";
//   // }
// }