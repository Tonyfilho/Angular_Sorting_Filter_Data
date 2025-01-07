import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserInterface } from '../types/user.interface';
import { USER } from '../_dummy_server/dummy_service';

@Injectable({
  providedIn: 'root',
})
export class UserTableService {
  constructor() {}

  getUsers(): Observable<IUserInterface[]> {
    return USER;
  }
}
