import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { IUserInterface } from '../types/user.interface';
import { USER } from '../_dummy_server/dummy_service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): Observable<IUserInterface[]> {
    return USER.pipe(delay(1000));
  }
}
