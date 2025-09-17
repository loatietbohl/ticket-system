import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TicketHistory } from 'src/ticket/entities';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  emitTicketMessage(payload: TicketHistory) {
    this.server.emit('ticketMessage', payload);
  }
}
