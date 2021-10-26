import {Injectable} from '@angular/core';
import {mockAuto, mockPrenotazioni} from "../../util/MockData";
import {Observable, of} from 'rxjs';
import {Mezzo, Prenotazione, Utente} from "../../util/Interfaces";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash';
import {dateOverlaps} from "../../util/Functions";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  //Decommentare quando si avranno richieste HTTP al posto di dati mock
  private userUrl = environment.apiBaseUrl;
  private mezziUrl = environment.apiBaseUrl;
  private prenotazioniUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getAvailableMezzi(inizio: Date, fine: Date) : Observable<Mezzo[]>{
    let avaibleVehicles : Mezzo [] = [];
    let x: any[] = [];
    x = _.filter(mockPrenotazioni, function (o) {
      return (o.accettata == true && !dateOverlaps(new Date(inizio), new Date(fine), new Date(o.dataDiInizio), new Date(o.dataDiFine)));
    });
    mockAuto.forEach(auto => {
      let flag = false;
      x.forEach(mezzoDaEliminare => {
        if(auto.id === mezzoDaEliminare.auto){
          flag = true;
        }
      });
      if(!flag){
        avaibleVehicles.push(auto);
      }
    });
    return of(avaibleVehicles);
  }

  getMockPrenotazioneFromId(prenotazioneId: number): Observable<any> {
    let index = _.findIndex(mockPrenotazioni,function (o) {
      return o.id == prenotazioneId;
    });
    return of(mockPrenotazioni[index]);
  }

  getMockPrenotazioni(): Observable<Prenotazione[]> {
    //Decommentare quando si avranno richieste HTTP al posto di dati mock
    const tempData: any[] = [];
    mockPrenotazioni.forEach(elem => tempData.push(elem));
    return of(tempData);
  }

  getUtenti() : Observable<Utente[]>{
    return this.http.get<Utente[]>(`${this.userUrl}/utente/all`);
  }

  updateUtente(utente : Utente) : Observable<Utente>{
    return this.http.post<Utente>(`${this.userUrl}/utente/update`, utente);
  }

  updateMezzo(mezzo : Mezzo) : Observable<Mezzo>{
    return this.http.post<Mezzo>(`${this.mezziUrl}/mezzo/update`, mezzo);
  }

  deleteUtente(utenteId : number) : Observable<Utente>{
    // @ts-ignore
    return this.http.post<Utente>(`${this.userUrl}/utente/delete/${utenteId}`);
  }

  deleteMezzo(mezzoId : number) : Observable<Mezzo>{
    // @ts-ignore
    return this.http.post<Mezzo>(`${this.mezziUrl}/mezzo/delete/${mezzoId}`);
  }

  getUtenteFromId(utenteId: number) : Observable<Utente> {
    return this.http.get<Utente>(`${this.userUrl}/utente/${utenteId}`);
  }

  getMezzi() : Observable<Mezzo[]>{
    return this.http.get<Mezzo[]>(`${this.mezziUrl}/mezzo/all`);
  }

  getMezzoFromId(mezzoId: number) : Observable<Mezzo> {
    return this.http.get<Mezzo>(`${this.mezziUrl}/mezzo/${mezzoId}`);
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
