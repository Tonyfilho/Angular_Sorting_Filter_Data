import { Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table/user-table.component';

export const routes: Routes = [
  { path: '', redirectTo: 'user-table', pathMatch: 'full' },
  { path: 'user-table', component: UserTableComponent },
];
