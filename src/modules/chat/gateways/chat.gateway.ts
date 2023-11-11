import { BadRequestException, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WebsocketsExceptionFilter } from '../ws-exception.filter';
import { ChatService } from '../services/chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseFilters(new WebsocketsExceptionFilter())
export class ChatGateway {
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('handleJoinTopic')
  async handleJoinTopic(client: Socket, data: {topicId: any}) {
    // console.log('Server: handleJoinRoom event received');
    const { topicId } = data;
    client.join(topicId);

    try {
      // Retrieve chat history for the specified topic from your database
      const chatHistory = await this.chatService.getChatHistory(topicId);
      
      // Send the chat history to the client
      client.emit('chatHistory', chatHistory);
    } catch (error) {
      client.emit('error', 'Failed to fetch chat history');
    }
  }

  @SubscribeMessage('handleChatMessages')
  async handleChatMessages(client: Socket, data: { topic: string; id: string; message?: string; attach?: string }) {
    try {
      const { topic, id, message, attach } = data;
      const savedMessage = await this.chatService.saveMessage(topic, id, message, attach);
      
      this.server.to(topic).emit('chat', savedMessage);
    } catch (error) {
      client.emit('error', 'Message sending failed');
    }
  }
}
// // V1
// import { BadRequestException, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Socket, Server } from 'socket.io';
// import { WebsocketsExceptionFilter } from '../ws-exception.filter';
// import { TopicContent } from 'src/modules/topic_contents/entities/topic_content.entity';
// import { ChatService } from '../services/chat.service';
// import { CreateTopicContentDto } from 'src/modules/topic_contents/dto/create-topic_content.dto';
// import { ChatSubscriptionsService } from '../services/chat-subscriptions.service';

// export class ChatGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(private chatService: ChatService,
//     private chatSubscriptionsService: ChatSubscriptionsService,) {}

//   handleConnection(client: Socket, ...args: any[]) {
//     console.log(`User connected: ${client.id}`);
//   }

//   @SubscribeMessage('subscribeToTopic')
//   async subscribeToTopic(client: Socket, topicId: string): Promise<void> {
//     // Subscribe the client to the specified topic
//     client.emit('message', "message1");
//     client.join(topicId);
//     this.chatSubscriptionsService.subscribeToTopic(topicId, client);
//   }

//   @SubscribeMessage('message')
//   async handleMessage(client: Socket, messageData: CreateTopicContentDto): Promise<void> {
//     if (!messageData.user || !messageData.topic) {
//       throw new BadRequestException('User and topic must be provided.');
//     }
    
//     const createdMessage = await this.chatService.createMessage(messageData);
    
//     // const messages = await this.chatService.getMessagesByTopicContent(messageData.user.id);
//     // console.log(messages);
    
//     client.broadcast.emit('message', createdMessage);
    
    
//   }

//   // @SubscribeMessage('message')
//   // @UsePipes(new ValidationPipe())
//   // handleMessage(
//   //   @MessageBody() message: TopicContent,
//   //   @ConnectedSocket() _client: Socket,
//   // ) {

    
    
//   //   this.server.emit('messageToAll', {
//   //     ...message,
//   //     time: new Date(),
//   //   });

//   //   _client.broadcast.emit('messageExceptSender', {
//   //     ...message,
//   //     time: new Date(),
//   //   })
    
//   //   // let room = message.topic_id;
//   //   // _client.broadcast.to(room).emit('messageExceptSender', {
//   //   //   ...message,
//   //   //   time: new Date(),
//   //   // })
//   // }


// }
// // ==========
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