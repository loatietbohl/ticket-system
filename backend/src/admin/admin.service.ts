import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketHistory } from '../ticket/entities';
import { TicketService } from '../ticket/ticket.service';
import { UpdateTicketAdminDto, FilterTicketAdminDto } from './dto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class AdminService {
  constructor(
    private ticketService: TicketService,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketHistory)
    private ticketHistoryRepository: Repository<TicketHistory>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async updateTicket(
    email: string,
    ticketId: number,
    updateTicketAdminDto: UpdateTicketAdminDto,
  ): Promise<TicketHistory> {
    if (!(await this.ticketService.findOne(ticketId))) {
      throw new NotFoundException();
    }

    const { status, priority, message } = updateTicketAdminDto;

    await this.ticketRepository.save({
      id: ticketId,
      status,
      priority,
    });

    const ticketHistory = await this.ticketHistoryRepository.save({
      ticket: { id: ticketId },
      message: message,
      email,
    });

    this.eventsGateway.emitTicketMessage(ticketHistory);

    return ticketHistory;
  }

  async findAll(filterTicketAdminDto: FilterTicketAdminDto): Promise<Ticket[]> {
    const where = Object.entries(filterTicketAdminDto).reduce(
      (acc, [filterName, filter]: [string, string]) =>
        !filter ? acc : { ...acc, [filterName]: filter },
      {},
    );
    return await this.ticketRepository.find({
      ...(where ? where : []),
    });
  }

  async findOneWithHistory(ticketId: number): Promise<Ticket> {
    const ticketHistory = await this.ticketRepository.findOne(ticketId, {
      relations: ['history'],
    });
    if (!ticketHistory) {
      throw new NotFoundException();
    }
    return ticketHistory;
  }
}
