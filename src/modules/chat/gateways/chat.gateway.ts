import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WebsocketsExceptionFilter } from '../ws-exception.filter';
import { TopicContent } from 'src/modules/topic_contents/entities/topic_content.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`User connected: ${client.id}`);
  }

  @SubscribeMessage('message')
  @UsePipes(new ValidationPipe())
  handleMessage(
    @MessageBody() message: TopicContent,
    @ConnectedSocket() _client: Socket,
  ) {

    
    
    this.server.emit('messageToAll', {
      ...message,
      time: new Date(),
    });

    _client.broadcast.emit('messageExceptSender', {
      ...message,
      time: new Date(),
    })
    
    // let room = message.topic_id;
    // _client.broadcast.to(room).emit('messageExceptSender', {
    //   ...message,
    //   time: new Date(),
    // })
  }


}

// import { IsNotEmpty, IsString } from 'class-validator';
// class ChatMessage {
//   @IsNotEmpty()
//   @IsString()
//   userID: string;
//   @IsNotEmpty()
//   @IsString()
//   topicID: string;
//   @IsNotEmpty()
//   @IsString()
//   message: string;
// }



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