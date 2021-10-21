import {Injectable} from '@angular/core';
import {mockAuto, mockPrenotazioni, mockUser} from "../../util/MockData";
import {Observable, of} from 'rxjs';
import {Mezzo, Prenotazione, Utente} from "../../util/Interfaces";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  // private userUrl = 'api/users';
  // private mezziUrl = 'api/mezzi';
  // private prenotazioniUrl = 'api/prenotazioni';

  constructor(private http: HttpClient) { }

  getMockUsers(): Observable<Utente[]>{
    // return this.http.get<Utente[]>(this.userUrl).pipe(catchError(this.handleError<Utente[]>('getMockUsers', [])));
    const tempData:any[] = [];
    mockUser.forEach(elem => tempData.push(elem));
    return of(tempData);
  }

  updateMockUser(user: Utente): Observable<any>{
    if(user.id !== null){
      let index = _.findIndex(mockUser, function (o) {return o.id == user.id});
      mockUser[index] = user;
    }
    else {
      user.id = mockUser[mockUser.length-1].id + 1;
      mockUser.push(user);
    }
    return of(mockUser);
  }

  removeMockUser(user: Utente): Observable<any>{
    _.remove(mockUser, function (o) {return o.id == user.id});
    return of(mockUser);
  }

  getMockMezzi(): Observable<Mezzo[]>{
    // return this.http.get<Mezzo[]>(this.mezziUrl).pipe(catchError(this.handleError<Mezzo[]>('getMockMezzi', [])));
    return of(mockAuto);
  }

  getMockPrenotazioni(): Observable<Prenotazione[]>{
  // return this.http.get<Prenotazione[]>(this.prenotazioniUrl).pipe(catchError(this.handleError<Prenotazione[]>('getMockPrenotazioni', [])));
    return of(mockPrenotazioni);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }

  // updateUtente(utente: Utente): Observable<any> {
  //   return this.http.put(this.userUrl, utente, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${utente.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

}
