import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from '../auth/auth.service';
import { AdminService } from './admin.service';
import { UpdateTicketAdminDto, FilterTicketAdminDto } from './dto';
import { Ticket, TicketHistory } from 'src/ticket/entities';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('tickets/:id')
  async update(
    @Request() req: Request & { user: JwtPayload },
    @Param('id', ParseIntPipe) ticketId: number,
    @Body() updateTicketAdminDto: UpdateTicketAdminDto,
  ): Promise<TicketHistory> {
    return await this.adminService.updateTicket(
      req.user.email,
      ticketId,
      updateTicketAdminDto,
    );
  }

  @Get('tickets')
  async findAll(
    @Query() filterTicketAdminDto: FilterTicketAdminDto,
  ): Promise<Ticket[]> {
    return await this.adminService.findAll(filterTicketAdminDto);
  }

  @Get('tickets/:id')
  async findOne(@Param('id', ParseIntPipe) ticketId: number): Promise<Ticket> {
    return await this.adminService.findOneWithHistory(ticketId);
  }
}
