# Angular_Sorting_Filter_Data
Learn how to create custom Angular table without any libraries. We will implement typical table features like sorting and filtering with real API. As it is much easier to support your own code it makes a lot of sense to build table on your own.

# Create a Interface type:
    id: string;
    name: string;
    age: number;
# Create a Dummy_Data with type bellow
[
  { "id": "1", "name": "Alice", "age": 34 },
  { "id": "2", "name": "Bob", "age": 59 },
   ...
   you can find in /app/_mock_server
]

# Create a userTableComponent 
  ng g c user-table/user-table/
  now We will put the <app-user-table></app-user-table> into the app component

# Create a Server will GET and  return a Observable, representing a kind webservice
ng g s user-table/
create a getUser().

# Inject our service into the component
implement 2 interface, OnInit and OnDestroy
create a local var to receive all data from Service .
create a local var to user into the OnDestroy will do UnSuscrible.

# Create a Table
create a table into the useTableComponent.html
create a local var to receive all collums

# Create a CSS

# Create a Function capitalize
That function will transforma 1º letter of the string in Upcase

# Create a Sorting Type
this type will use in sorting Function Data

# Create a Sorting Functions
create a local var to defaut sorting
inside of html in he span must user  alt+24 ↑ and alt+25 ↓ to access UTF-8 Symbols

# Create a SortAllTable Function
That function will update de var sorting.
Obs: Observações:
Imutabilidade: Para preservar o array original, use o operador de espalhamento ([...]) antes de ordenar.
localeCompare: É ideal para ordenação de strings, respeitando regras de ordenação alfabética, incluindo casos especiais como acentos.












