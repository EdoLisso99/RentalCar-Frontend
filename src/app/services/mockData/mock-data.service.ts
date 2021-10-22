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
  //Decommentare quando si avranno richieste HTTP al posto di dati mock
  // private userUrl = 'api/users';
  // private mezziUrl = 'api/mezzi';
  // private prenotazioniUrl = 'api/prenotazioni';

  constructor(private http: HttpClient) {
  }

  getMockUsers(): Observable<Utente[]> {
    //Decommentare quando si avranno richieste HTTP al posto di dati mock
    // return this.http.get<Utente[]>(this.userUrl).pipe(catchError(this.handleError<Utente[]>('getMockUsers', [])));
    const tempData: any[] = [];
    mockUser.forEach(elem => tempData.push(elem));
    return of(tempData);
  }

  updateMockUser(user: Utente): Observable<any> {
    if (user.id !== null && user.id !== -1) {
      let index = _.findIndex(mockUser, function (o) {
        return o.id == user.id
      });
      mockUser[index] = user;
    } else {
      user.id = mockUser[mockUser.length - 1].id + 1;
      mockUser.push(user);
    }
    return of(mockUser);
  }

  getMockUserFromId(userId: number): Observable<Utente> {
    let index = _.findIndex(mockUser,function (o) {
      return o.id == userId;
    });
    return of(mockUser[index]);
  }

  getMockMezzoFromId(mezzoId: number): Observable<Mezzo> {
    let index = _.findIndex(mockAuto,function (o) {
      return o.id == mezzoId;
    });
    return of(mockAuto[index]);
  }

  //TODO Forse può dare problemi col null
  getMockPrenotazioneFromId(prenotazioneId: number): Observable<any> {
    let index = _.findIndex(mockPrenotazioni,function (o) {
      return o.id == prenotazioneId;
    });
    return of(mockPrenotazioni[index]);
  }

  removeMockUser(user: Utente): Observable<any> {
    _.remove(mockUser, function (o) {
      return o.id == user.id
    });
    return of(mockUser);
  }

  getMockMezzi(): Observable<Mezzo[]> {
    const tempData: any[] = [];
    mockAuto.forEach(elem => tempData.push(elem));
    return of(tempData);
    //Decommentare quando si avranno richieste HTTP al posto di dati mock
    // return this.http.get<Mezzo[]>(this.mezziUrl).pipe(catchError(this.handleError<Mezzo[]>('getMockMezzi', [])));
  }

  updateMockMezzo(mezzo: Mezzo) {
    if (mezzo.id !== null && mezzo.id !== -1) {
      let index = _.findIndex(mockAuto, function (o) {
        return o.id == mezzo.id
      });
      mockAuto[index] = mezzo;
    } else {
      mezzo.id = mockAuto[mockAuto.length - 1].id + 1;
      mockAuto.push(mezzo);
    }
    return of(mockAuto);
  }

  removeMockMezzo(mezzo: Mezzo): Observable<any> {
    _.remove(mockAuto, function (o) {
      return o.id == mezzo.id
    });
    return of(mockAuto);
  }

  getMockPrenotazioni(): Observable<Prenotazione[]> {
    //Decommentare quando si avranno richieste HTTP al posto di dati mock
    // return this.http.get<Utente[]>(this.userUrl).pipe(catchError(this.handleError<Utente[]>('getMockUsers', [])));
    const tempData: any[] = [];
    mockPrenotazioni.forEach(elem => tempData.push(elem));
    return of(tempData);
  }

  updateMockPrenotazione(prenotazione: Prenotazione) {
    if (prenotazione.id !== null && prenotazione.id !== -1) {
      let index = _.findIndex(mockPrenotazioni, function (o) {
        return o.id == prenotazione.id
      });
      mockPrenotazioni[index] = prenotazione;
    } else {
      prenotazione.id = mockPrenotazioni[mockPrenotazioni.length - 1].id + 1;
      mockPrenotazioni.push(prenotazione);
    }
    return of(mockPrenotazioni);
  }

  removeMockPrenotazione(prenotazione: Prenotazione): Observable<any> {
    _.remove(mockPrenotazioni, function (o) {
      return o.id == prenotazione.id
    });
    return of(mockPrenotazioni);
  }

  removePrenotazioniFromMezzi(mezzoId: number){
    _.remove(mockPrenotazioni, function (o) {
      return o.auto == mezzoId
    });
    return of(mockPrenotazioni);
  }

  removePrenotazioniFromUtenti(utenteId: number){
    _.remove(mockPrenotazioni, function (o) {
      return o.utente == utenteId
    });
    return of(mockPrenotazioni);
  }

  //Decommentare quando si avranno richieste HTTP al posto di dati mock
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     return of(result as T);
  //   };
  // }

  //Decommentare quando si avranno richieste HTTP al posto di dati mock
  // updateUtente(utente: Utente): Observable<any> {
  //   return this.http.put(this.userUrl, utente, this.httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${utente.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

}
