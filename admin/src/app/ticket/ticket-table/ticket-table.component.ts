import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TicketPriority, TicketsResponse, TicketStatus } from '../ticket.types';
import { TicketService } from '../ticket.service';

type Filter = {
  status: string;
  priority: string;
};

@Component({
  selector: 'app-ticket-table',
  templateUrl: './ticket-table.component.html',
  styleUrls: ['./ticket-table.component.scss'],
})
export class TicketTableComponent implements OnInit {
  dataSource = new MatTableDataSource<TicketsResponse>([]);
  displayedColumns: string[] = ['title', 'status', 'priority'];

  status: (TicketStatus | 'All')[] = ['All', 'open', 'in_progress', 'closed'];
  priorities: (TicketPriority | 'All')[] = ['All', 'low', 'medium', 'high'];

  selectedStatus: TicketStatus | 'All' = 'All';
  selectedPriority: TicketPriority | 'All' = 'All';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((data) => {
      this.dataSource.data = data;

      this.dataSource.filterPredicate = (
        data: TicketsResponse,
        filter: string
      ) => {
        const f = JSON.parse(filter) as Filter;
        const statusMatch = f.status === 'All' || data.status === f.status;
        const priorityMatch =
          f.priority === 'All' || data.priority === f.priority;
        return statusMatch && priorityMatch;
      };

      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filterValue = {
      status: this.selectedStatus,
      priority: this.selectedPriority,
    };
    this.dataSource.filter = JSON.stringify(filterValue);
  }

  resetFilters(): void {
    this.selectedStatus = 'All';
    this.selectedPriority = 'All';
    this.applyFilter();
  }
}
