import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserTableService } from '../user-table.service';
import { IUserInterface } from '../../types/user.interface';
import { Subscription } from 'rxjs';
import { ISortingInterface } from '../../types/sorting.interface';

@Component({
  selector: 'app-user-table',
  imports: [],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
})
export class UserTableComponent implements OnInit, OnDestroy {
  protected userTableServer = inject(UserTableService);
  protected unSubs!: Subscription;
  protected localUserTable: IUserInterface[] = [];
  /* protected localUserTable: IUserInterface[] | any[] = []; podemos por o | any[] para n dar error de compilação no FOR de FOR
   * Ou Usar a solução KEYOF protected columns: Array<keyof IUserInterface> = ['id', 'name', 'age']; */
  protected columns: Array<keyof IUserInterface> = ['id', 'name', 'age'];
  protected sorting: ISortingInterface = { column: 'id', order: 'asc' };

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
    // Ordenação ascendente por nome
    const ascendingByName = [...this.localUserTable].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // Ordenação descendente por nome
    const descendingByName = [...this.localUserTable].sort((a, b) =>
      b.name.localeCompare(a.name)
    );

    // Ordenação ascendente por ID
    const ascendingById = [...this.localUserTable].sort(
      (a, b) => parseInt(a.id) - parseInt(b.id)
    );

    // Ordenação descendente por ID
    const descendingById = [...this.localUserTable].sort(
      (a, b) => parseInt(b.id) - parseInt(a.id)
    );

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
          return (this.localUserTable = [...ascendingByAge]);
        } else {
          this.localUserTable = [];
          return (this.localUserTable = [...descendingByAge]);
        }

      default:
        break;
    }
  }
  ngOnDestroy(): void {
    this.unSubs.unsubscribe();
  }
}
