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
    userEmail: string,
    ticketId: number,
    updateTicketAdminDto: UpdateTicketAdminDto,
  ): Promise<TicketHistory | undefined> {
    if (!(await this.ticketService.findOne(ticketId))) {
      throw new NotFoundException();
    }

    await this.ticketRepository.save({
      id: ticketId,
      status: updateTicketAdminDto.status,
      priority: updateTicketAdminDto.priority,
    });
    const ticketHistory = this.ticketHistoryRepository.create({
      message: updateTicketAdminDto.message,
      email: userEmail,
      ticket: { id: ticketId },
    });
    const savedTicketHistory =
      await this.ticketHistoryRepository.save(ticketHistory);

    this.eventsGateway.emitTicketMessage(savedTicketHistory);

    return savedTicketHistory;
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

  async findOneWithHistory(ticketId: number) {
    const ticketHistory = await this.ticketRepository.findOne(ticketId, {
      relations: ['history'],
    });
    if (!ticketHistory) {
      throw new NotFoundException();
    }
    return ticketHistory;
  }
}
