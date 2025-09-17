import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import {
  CreateTicketMessageDto,
  CreateTicketDto,
  FilterTicketDto,
  TicketUserResponseDto,
} from './dto';
import { Ticket, TicketHistory } from './entities';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return await this.ticketService.create(createTicketDto);
  }

  @Post(':id')
  async addMessage(
    @Param('id', ParseIntPipe) ticketId: number,
    @Body() createMessageDto: CreateTicketMessageDto,
  ): Promise<TicketHistory> {
    return await this.ticketService.addMessage(ticketId, createMessageDto);
  }

  @Get()
  async findAll(
    @Query() filterTicketDto: FilterTicketDto,
  ): Promise<TicketUserResponseDto[]> {
    return await this.ticketService.findAll(filterTicketDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) ticketId: number): Promise<Ticket> {
    return await this.ticketService.findOneWithHistory(ticketId);
  }
}
