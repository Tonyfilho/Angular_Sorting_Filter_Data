import { Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table/user-table.component';
import { SignalTableComponent } from './user-table/signal-table/signal-table.component';
import { ObservableTableComponent } from './user-table/observable-table/observable-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user-table', pathMatch: 'full' },
  { path: 'user-table', component: UserTableComponent },
  { path: 'signal-table', component: SignalTableComponent },
  { path: 'observable-table', component: ObservableTableComponent },
];
