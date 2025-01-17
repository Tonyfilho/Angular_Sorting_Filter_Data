import { Observable } from "rxjs";
import { IUserInterface } from "../types/user.interface";

export const USER = new Observable<IUserInterface[]>(d => d.next([
  { "id": "1", "name": "Bob", "age": 34 },
  { "id": "2", "name": "Alice", "age": 59 },
  { "id": "3", "name": "Charlie", "age": 26 },
  { "id": "4", "name": "Diana", "age": 56 },
  { "id": "5", "name": "Edward", "age": 31 },
  { "id": "6", "name": "George", "age": 69 },
  { "id": "7", "name": "Fiona", "age": 51 },
  { "id": "8", "name": "IaHannah", "age": 57 },
  { "id": "9", "name": "Ian", "age": 39 },
  { "id": "10", "name": "Jane", "age": 40 },
  { "id": "11", "name": "Kevin", "age": 62 },
  { "id": "12", "name": "Laura", "age": 39 },
  { "id": "13", "name": "Michael", "age": 44 },
  { "id": "14", "name": "Nina", "age": 26 },
 
]));

/** { "id": "15", "name": "Oscar", "age": 27 },
  { "id": "16", "name": "Paula", "age": 39 },
  { "id": "17", "name": "Quentin", "age": 39 },
  { "id": "18", "name": "Rachel", "age": 47 },
  { "id": "19", "name": "Steve", "age": 67 },
  { "id": "20", "name": "Tina", "age": 61 },
  { "id": "21", "name": "Uma", "age": 34 },
  { "id": "22", "name": "Victor", "age": 54 },
  { "id": "23", "name": "Wendy", "age": 43 },
  { "id": "24", "name": "Xander", "age": 65 },
  { "id": "25", "name": "Yara", "age": 68 },
  { "id": "26", "name": "Zach", "age": 40 },
  { "id": "27", "name": "Andrew", "age": 50 },
  { "id": "28", "name": "Bianca", "age": 29 },
  { "id": "29", "name": "Catherine", "age": 48 },
  { "id": "30", "name": "Daniel", "age": 32 } */





  