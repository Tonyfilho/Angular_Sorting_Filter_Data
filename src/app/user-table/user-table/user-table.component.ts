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
        (this.localUserTable = response), console.log('response: ', response);
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
    (this.sorting = { column, order: futureSortingOrder })
    this.sortAllTable(column);
    return this.sorting;
  }

  sortAllTable(column: string) {
    // Ordenação ascendente por idade
    const ascendingByAge = [...this.localUserTable].sort(
      (a, b) => a.age - b.age
    );

    // Ordenação descendente por idade
    const descendingByAge = [...this.localUserTable].sort(
      (a, b) => b.age - a.age
    );

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
  }
  ngOnDestroy(): void {
    this.unSubs.unsubscribe();
  }
}
