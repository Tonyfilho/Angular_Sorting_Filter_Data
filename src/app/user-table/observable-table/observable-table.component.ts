import { UserService } from './../user.service';

import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
import { IUserInterface } from '../../types/user.interface';
import { ISortingInterface } from '../../types/sorting.interface';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-observable-table',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './observable-table.component.html',
  styleUrl: './../user-table/user-table.component.css',
})
export class ObservableTableComponent implements OnDestroy {
  protected observableTableForm: FormGroup;
  protected user: BehaviorSubject<IUserInterface[] | null> =
    new BehaviorSubject<IUserInterface[] | null>(null);
  protected unSubs!: Subscription;
  protected columns: Array<keyof IUserInterface> = ['id', 'name', 'age'];
  protected sorting: ISortingInterface = { order: 'asc', column: 'id' };

  constructor(
    private userService: UserService,
    private fb: UntypedFormBuilder
  ) {
    this.unSubs = this.userService.getUsers().subscribe({
      next: (res) => {
        this.user.next(res);
      },
      error: (e) => {},
      complete: () => {},
    });

    this.observableTableForm = fb.nonNullable.group({
      search_name: [''],
    });
  }
  capitalizer(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
  isArrowDown(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }
  isArrowUp(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }
  sortArrowTable(column: string): void {
    const nextSort = this.isArrowUp(column) ? 'desc' : 'asc';
    this.sorting = { column, order: nextSort };
    this.sortAllData(column);
  }

  sortAllData(collumn: string): void {
    switch (collumn) {
      case 'age':
        //console.log("Age: ", this.user.value);
        const sortAgeAsc: IUserInterface[] = [
          ...(this.user.value as IUserInterface[]),
        ].sort((asc, desc) => asc.age - desc.age);
        const sortAgeDesc: IUserInterface[] = [
          ...(this.user.value as IUserInterface[]),
        ].sort((asc, desc) => desc.age - asc.age);
        this.isArrowUp(collumn)
          ? this.user.next(sortAgeAsc)
          : this.user.next(sortAgeDesc);

        break;
      case 'name':
        const sortNameAsc: IUserInterface[] = [
          ...(this.user.value as IUserInterface[]),
        ].sort((asc, desc) => asc.name.localeCompare(desc.name));
        const sortNameDesc: IUserInterface[] = [
          ...(this.user.value as IUserInterface[]),
        ].sort((asc, desc) => desc.name.localeCompare(asc.name));
        this.isArrowUp(collumn)
          ? this.user.next(sortNameAsc)
          : this.user.next(sortNameDesc);

        break;

      default:
        const sortIdAsc: IUserInterface[] = [
          ...(this.user.value as IUserInterface[]),
        ].sort((asc, desc) => parseInt(asc.id) - parseInt(desc.id));
        const sortIdDesc: IUserInterface[] = [
          ...(this.user.value as IUserInterface[]),
        ].sort((asc, desc) => parseInt(desc.id) - parseInt(asc.id));
        this.isArrowUp(collumn)
          ? this.user.next(sortIdAsc)
          : this.user.next(sortIdDesc);
        break;
    }
  }

  searchByName(search:string) {
    const noFilterTable = [...this.user.value as IUserInterface[]];
    const filterTable = noFilterTable.filter(ret => ret.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
    if (search) {
      return this.user.next(filterTable);
      
    }
    return this.user;
  }

  getName() {
    const noFilterTable = [...this.user.value as IUserInterface[]];
    this.observableTableForm.valueChanges.pipe(delay(1000)).subscribe(d => {
      if (d.search_name === '') {
        this.user.next(noFilterTable);
        
      }
     return this.searchByName(d.search_name);
    });
  }

  ngOnDestroy(): void {
    this.unSubs.unsubscribe();
  }
}
