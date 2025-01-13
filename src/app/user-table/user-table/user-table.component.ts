import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUserInterface } from '../../types/user.interface';
import { delay, Subscription } from 'rxjs';
import { ISortingInterface } from '../../types/sorting.interface';

import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-user-table',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit, OnDestroy {
  protected userTableServer = inject(UserService);
  protected unSubs!: Subscription;
  protected localUserTable: IUserInterface[] = [];
  /* protected localUserTable: IUserInterface[] | any[] = []; podemos por o | any[] para n dar error de compilação no FOR de FOR
   * Ou Usar a solução KEYOF protected columns: Array<keyof IUserInterface> = ['id', 'name', 'age']; */
  protected columns: Array<keyof IUserInterface> = ['id', 'name', 'age'];
  protected sorting: ISortingInterface = { column: 'id', order: 'asc' };
  private fb = inject(UntypedFormBuilder);
  userTableForm: FormGroup = this.fb.nonNullable.group({
    search_name: [''],
  });

  ngOnInit(): void {
    this.unSubs = this.userTableServer.getUsers().subscribe({
      next: (response) => {
        this.localUserTable = response;
      },
      error: (e) => {},
      complete: () => {},
    });
  }

  capitalizer(str: string): string {
    /**1º rebe a string e retorna o caracter 0
     * 2º transforma um cx alta
     * 3º concatena a string a parti do caracter 1
     */
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
  isDescSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }
  isAscSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }

  sortTable(column: string) {
    const futureSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sorting = { column, order: futureSortingOrder };
    this.sortAllData(column);
    return this.sorting;
  }

  sortAllData(column: string) {
    switch (column) {
      case 'age':
        // Ordenação ascendente por idade
        const ascendingByAge = [...this.localUserTable].sort(
          (a, b) => a.age - b.age
        );

        // Ordenação descendente por idade
        const descendingByAge = [...this.localUserTable].sort(
          (a, b) => b.age - a.age
        );
        /**Neste ex: o ternario Não atualiza a ref. da memoria , com isto não atualiza  o array, em outras palavra não ordena */
        // this.sorting.column === 'asc' ? this.localUserTable = [...ascendingByAge] : this.localUserTable = [...descendingByAge];
        if (this.sorting.order === 'asc') {
          this.localUserTable = [];
          this.localUserTable = [...ascendingByAge];
        } else {
          this.localUserTable = [];
          this.localUserTable = [...descendingByAge];
        }
        break;
      case 'name':
        // Ordenação ascendente por nome
        const ascendingByName = [...this.localUserTable].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        // Ordenação descendente por nome
        const descendingByName = [...this.localUserTable].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        if (this.sorting.order === 'asc') {
          this.localUserTable = [];
          this.localUserTable = [...ascendingByName];
        } else {
          this.localUserTable = [];
          this.localUserTable = [...descendingByName];
        }
        break;
      default:
        // Ordenação ascendente por ID
        const ascendingById = [...this.localUserTable].sort(
          (a, b) => parseInt(a.id) - parseInt(b.id)
        );

        // Ordenação descendente por ID
        const descendingById = [...this.localUserTable].sort(
          (a, b) => parseInt(b.id) - parseInt(a.id)
        );
        if (this.sorting.order === 'asc') {
          this.localUserTable = [];
          this.localUserTable = [...ascendingById];
        } else {
          this.localUserTable = [];
          this.localUserTable = [...descendingById];
        }

        break;
    }
  }

  searchByName(search: string) {
    const noFilterTable: IUserInterface[] = [...this.localUserTable];
    const filterTable: IUserInterface[] = [...noFilterTable].filter(
      (ret) => ret.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
    if (search) {
      return (this.localUserTable = [...filterTable]);
    }
    return this.localUserTable;
  }

  getName() {
    const noFilterTable: IUserInterface[] = [...this.localUserTable];
    this.userTableForm.valueChanges.pipe(delay(1000)).subscribe((d) => {
      if (d['search_name'] === '') {
        this.localUserTable = noFilterTable;
        return this.localUserTable;
      }
      return this.searchByName(d['search_name']);
    });
  }
  ngOnDestroy(): void {
    this.unSubs.unsubscribe();
  }
}
