import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from 'src/ticket/ticket.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Ticket, TicketHistory } from '../ticket/entities';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    TicketModule,
    TypeOrmModule.forFeature([Ticket, TicketHistory]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
