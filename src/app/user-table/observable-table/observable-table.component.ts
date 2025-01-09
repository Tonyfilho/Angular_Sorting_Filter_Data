import { UserService } from './../user.service';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserInterface } from '../../types/user.interface';

@Component({
  selector: 'app-observable-table',
  imports: [CommonModule],
  templateUrl: './observable-table.component.html',
  styleUrl: './../user-table/user-table.component.css',
})
export class ObservableTableComponent {
  user: BehaviorSubject<IUserInterface[] | null> = new BehaviorSubject<
    IUserInterface[] | null
  >(null);
  columns: Array<keyof IUserInterface> = ['id', 'name', 'age'];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe({
      next: (res) => {this.user.next(res)},
      error: (e) => {},
      complete: () => {},
    });
  }
}
