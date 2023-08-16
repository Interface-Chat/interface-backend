import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway()
export class ChatGateway {
  @SubscribeMessage('message')
  onNewMessage(@MessageBody() data: any): string {
    // Handle incoming messages and broadcast them to clients
    console.log("connected");
    console.log(data);
    
    
    return "fine";
  }
}