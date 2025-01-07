import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserTableService } from '../user-table.service';
import { IUserInterface } from '../../types/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit, OnDestroy {
  protected userTableServer = inject(UserTableService);
  protected localUserTable: IUserInterface[] = [];
  protected unSubs!: Subscription;

  ngOnInit(): void {
    this.unSubs = this.userTableServer.getUsers().subscribe({
      next: (response) => {this.localUserTable = response, console.log("response: " , response)},
      error: (e) => {},
      complete: () => {},
    });
  }

  ngOnDestroy(): void {
    this.unSubs.unsubscribe();
  }
}
