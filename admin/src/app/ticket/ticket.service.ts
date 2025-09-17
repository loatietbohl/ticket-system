import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  TicketHistory,
  TicketHistoryResponse,
  TicketPriority,
  TicketsResponse,
  TicketStatus,
} from './ticket.types';

type TicketPayload = {
  status: TicketStatus;
  priority: TicketPriority;
  message: string;
};

@Injectable({ providedIn: 'root' })
export class TicketService {
  constructor(private http: HttpClient) {}

  getTicketById(id: number): Observable<TicketHistoryResponse> {
    return this.http.get<TicketHistoryResponse>(
      `http://localhost:3000/admin/tickets/${id}`
    );
  }

  getTickets(): Observable<TicketsResponse[]> {
    return this.http.get<TicketsResponse[]>(
      'http://localhost:3000/admin/tickets'
    );
  }

  updateTicket(id: number, payload: TicketPayload): Observable<TicketHistory> {
    return this.http.post<TicketHistory>(
      `http://localhost:3000/admin/tickets/${id}`,
      payload
    );
  }
}
