import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { ISortingInterface } from '../../types/sorting.interface';
import { IUserInterface } from '../../types/user.interface';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signal-table',
  imports: [CommonModule],
  templateUrl: './signal-table.component.html',
  styleUrl: './../user-table/user-table.component.css',
})
export class SignalTableComponent {
  users = signal<IUserInterface[]>([]);
  columns: Array<keyof IUserInterface> = [
    'id',
    'name',
    'age',
  ]; /**keyof faz com que fique typado, mas somente as Keys da interface */
  sorting: ISortingInterface = { column: 'id', order: 'asc' };

  constructor(private userService: UserService) {
    /**Quando usamos o Effect() junto com Observable, alem de execulta assim q houve uma atualização seja com Observable ou
     * do Signal, nós já não precisamos nos preoculpar com a Unsubscrition, será feito pelo Effect() */
    effect(() => {
      this.userService.getUsers().subscribe({
        next: (res) => {
          this.users.set(res);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {},
      });
    });
  }

  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.substring(1);
  }
  /**Escondendo ou motrando as arrows do html */
  isAscSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }
  isDescSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }
  /** mundando o tipo de sorting, atuando nas Arrows do Html */
  sortTable(column: string): void {
    // this.isDescSorting(column) ? this.sorting = {column, order: 'asc'} : this.sorting = {column, order: 'desc'}; ou este
    /**Se isDescSorting é True se for DESC, então inverto e mando ASC dentro do ternario */
    const nextSort = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sorting = { column, order: nextSort };
  }

  sortAllData(column: string) {
    switch (column) {
      case 'age':
        /**sorting Age asc */
        const sortAgeAsc: IUserInterface[] = this.users().sort(
          (asc, desc) => asc.age - desc.age
        );
        const sortAgeDesc: IUserInterface[] = this.users().sort(
          (asc, desc) => desc.age - asc.age
        );

        break;
      case 'name':
        const sortNameAsc: IUserInterface[] = this.users().sort((asc, desc) =>
          asc.name.localeCompare(desc.name)
        );
        const sortNameDesc: IUserInterface[] = this.users().sort((asc, desc) =>
          desc.name.localeCompare(asc.name)
        );
        break;

      default:
        const sortIdAsc: IUserInterface[] = this.users().sort(
          (asc, desc) => parseInt(asc.id) - parseInt(desc.id)
        );
        const sortIdDesc: IUserInterface[] = this.users().sort(
          (asc, desc) => parseInt(desc.id) - parseInt(asc.id)
        );
        break;
    }
  }
} /**end class */
