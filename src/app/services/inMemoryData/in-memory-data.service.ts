import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import { Utente } from "../../util/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{



  constructor() { }

  createDb() {
    const mockUsers : Utente[] = [
      // {
      //   id: 1,
      //   nome: 'Edoardo',
      //   cognome: 'Lissoni',
      //   dataDiNascita: new Date('1999/04/12'),
      //   ruolo: 'SuperUser'
      // },
      // {
      //   id: 2,
      //   nome: 'Mattia',
      //   cognome: 'Cattaneo',
      //   dataDiNascita: new Date('1995/11/01'),
      //   ruolo: 'Customer'
      // },
      // {
      //   id: 3,
      //   nome: 'Fabio',
      //   cognome: 'Yong',
      //   dataDiNascita: new Date('1998/07/27'),
      //   ruolo: 'Customer'
      // },
      // {
      //   id: 4,
      //   nome: 'Manuel',
      //   cognome: 'Tocchi',
      //   dataDiNascita: new Date('1996/06/19'),
      //   ruolo: 'Customer'
      // },
      // {
      //   id: 5,
      //   nome: 'Alessio',
      //   cognome: 'Popolo',
      //   dataDiNascita: new Date('1997/02/11'),
      //   ruolo: 'Customer'
      // },
      // {
      //   id: 6,
      //   nome: 'Carlo',
      //   cognome: 'D\'Amato',
      //   dataDiNascita: new Date('1994/02/04'),
      //   ruolo: 'Customer'
      // }
    ];
    return {mockUsers};
  }
}
