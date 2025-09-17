import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../ticket.service';
import {
  TicketHistory,
  TicketHistoryResponse,
  TicketPriority,
  TicketStatus,
} from '../ticket.types';
import { SocketService } from 'src/app/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-history',
  templateUrl: './ticket-history.component.html',
  styleUrls: ['./ticket-history.component.scss'],
})
export class TicketHistoryComponent implements OnInit {
  private subscription: Subscription | null = null;

  ticket?: TicketHistoryResponse;
  loading = true;

  form: FormGroup;
  submitting = false;
  status: TicketStatus[] = ['open', 'in_progress', 'closed'];
  priority: TicketPriority[] = ['low', 'medium', 'high', 'urgent'];

  constructor(
    private route: ActivatedRoute,
    private socketService: SocketService,
    private ticketService: TicketService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      status: [null, Validators.required],
      priority: [null, Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ticketService.getTicketById(id).subscribe((ticket) => {
      this.ticket = ticket;
      this.loading = false;

      this.form.patchValue({
        status: ticket?.status || null,
        priority: ticket?.priority || null,
      });
    });

    this.subscription = this.socketService
      .onEvent<TicketHistory>('ticketMessage')
      .subscribe((response) => {
        if (!this.ticket) {
          return;
        }

        this.ticket.history = [
          ...this.ticket.history,
          {
            id: response.id,
            email: response.email,
            message: response.message,
            createdAt: response.createdAt,
          },
        ];
      });
  }

  submit() {
    if (!this.ticket) {
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const payload = {
      status: this.form.value.status,
      priority: this.form.value.priority,
      message: this.form.value.message,
    };

    this.ticketService.updateTicket(this.ticket.id, payload).subscribe({
      next: () => {
        this.submitting = false;

        this.form.get('message')?.reset('');
        this.form.get('message')?.setErrors(null);
      },
      error: (err) => {
        this.submitting = false;
      },
    });
  }
}
