import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { ISortingInterface } from '../../types/sorting.interface';
import { IUserInterface } from '../../types/user.interface';
import { UserService } from '../user.service';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signal-table',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signal-table.component.html',
  styleUrl: './../user-table/user-table.component.css',
})
export class SignalTableComponent {
 protected fb: UntypedFormBuilder = inject(UntypedFormBuilder);
protected signalTableForm: FormGroup = this.fb.nonNullable.group({
  search_name: ['']
})
protected users = signal<IUserInterface[]>([]);
columns: Array<keyof IUserInterface> = [
  'id',
  'name',
  'age',
]; /**keyof faz com que fique typado, mas somente as Keys da interface */
protected sorting: ISortingInterface = { column: 'id', order: 'asc' };

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
    this.sortAllData(this.sorting.column);
  }
  
  sortAllData(column: string) {
    switch (column) {
      case 'age':
        /**sorting Age asc , temos q criar uma nova referencia na memoria ...[] para não alterar o original, senão faremos o sorting de algo ja sorting*/
        const sortAgeAsc: IUserInterface[] = [...this.users()].sort(
          (asc, desc) => asc.age - desc.age
        );
        // console.log('asc: ', sortAgeAsc);
        const sortAgeDesc: IUserInterface[] = [...this.users()].sort(
          (asc, desc) => desc.age - asc.age
        );
        // console.log('desc: ', sortAgeDesc);
        //  this.users.set([]); com Signal não precisamos zerá o Array,e o ternario funciona, no lugar o if e else
        this.isAscSorting(column)
        ? this.users.set(sortAgeAsc)
        : this.users.set(sortAgeDesc);
        
        break;
        case 'name':
          const sortNameAsc: IUserInterface[] = [...this.users()].sort(
            (asc, desc) => asc.name.localeCompare(desc.name)
          );
          const sortNameDesc: IUserInterface[] = [...this.users()].sort(
            (asc, desc) => desc.name.localeCompare(asc.name)
          );
          this.isAscSorting(column)
          ? this.users.set(sortNameAsc)
          : this.users.set(sortNameDesc);
          break;
          
          default:
            const sortIdAsc: IUserInterface[] = [...this.users()].sort(
              (asc, desc) => parseInt(asc.id) - parseInt(desc.id)
            );
            const sortIdDesc: IUserInterface[] = [...this.users()].sort(
              (asc, desc) => parseInt(desc.id) - parseInt(asc.id)
        );
        this.isAscSorting(column)
        ? this.users.set(sortIdAsc)
        : this.users.set(sortIdDesc);
        break;
      }
    }
    getName() {
    throw new Error('Method not implemented.');
    }
  } /**end class */
