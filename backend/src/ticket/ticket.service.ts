import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketHistory } from './entities';
import {
  CreateTicketMessageDto,
  CreateTicketDto,
  FilterTicketDto,
  TicketUserResponseDto,
} from './dto';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(TicketHistory)
    private ticketHistoryRepository: Repository<TicketHistory>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  async create(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { title, email, message } = createTicketDto;
    return this.ticketRepository.save({
      title,
      email,
      history: [{ email, message }],
    });
  }

  async addMessage(
    ticketId: number,
    createMessageDto: CreateTicketMessageDto,
  ): Promise<TicketHistory> {
    if (!(await this.findOne(ticketId))) {
      throw new NotFoundException();
    }

    const ticketHistory = await this.ticketHistoryRepository.save({
      ...createMessageDto,
      ticket: { id: ticketId },
    });

    this.eventsGateway.emitTicketMessage(ticketHistory);

    return ticketHistory;
  }

  async findAll(
    filterTicketDto: FilterTicketDto,
  ): Promise<TicketUserResponseDto[]> {
    return await this.ticketRepository.find({
      select: ['id', 'email', 'title', 'status'],
      where: {
        email: filterTicketDto.email,
      },
    });
  }

  async findOneWithHistory(ticketId: number) {
    const ticketHistory = await this.ticketRepository.findOne(ticketId, {
      select: ['id', 'email', 'title', 'status'],
      relations: ['history'],
    });
    if (!ticketHistory) {
      throw new NotFoundException();
    }
    return ticketHistory;
  }

  async findOne(ticketId: number): Promise<Ticket | undefined> {
    return await this.ticketRepository.findOne(ticketId);
  }
}
