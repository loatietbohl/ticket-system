import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketTableComponent } from './ticket/ticket-table/ticket-table.component';
import { TicketHistoryComponent } from './ticket/ticket-history/ticket-history.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginGuard } from './login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'tickets',
    component: TicketTableComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tickets/:id',
    component: TicketHistoryComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
