import { Injectable } from '@angular/core';
import {mockUser, mockAuto} from "../util/MockData";
import { Observable, of } from 'rxjs';
import {Mezzo, Utente} from "../util/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  getMockUsers(): Observable<Utente[]>{
    const users = of(mockUser);
    return users;
  }

  getMockMezzi(): Observable<Mezzo[]>{
    const mezzi = of(mockAuto);
    return mezzi;
  }

  constructor() { }
}
