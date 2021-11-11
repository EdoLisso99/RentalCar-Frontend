import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Utente} from "../../util/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private userUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getUtenti() : Observable<Utente[]>{
    return this.http.get<any[]>(`${this.userUrl}/utente/all`);
  }

  updateUtente(utente : Utente, flag : boolean) : Observable<Utente>{
    let params = new HttpParams();
    params = params.append("updatePw", flag);
    return this.http.put<Utente>(`${this.userUrl}/utente/update`, utente, {params: params});
  }

  deleteUtente(utenteId : number) : Observable<Utente>{
    return this.http.delete<Utente>(`${this.userUrl}/utente/delete/${utenteId}`);
  }

  getUtenteFromId(utenteId: number) : Observable<Utente> {
    return this.http.get<Utente>(`${this.userUrl}/utente/${utenteId}`);
  }

  getUtenteFromUsername(username: string) : Observable<Utente> {
    return this.http.get<Utente>(`${this.userUrl}/utente/username/${username}`)
  }

}
