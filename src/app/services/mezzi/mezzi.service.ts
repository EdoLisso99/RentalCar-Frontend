import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Mezzo} from "../../util/Interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MezziService {
  private mezziUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getAvailableMezzi(inizio: string, fine: string) : Observable<Mezzo[]>{
    let params = new HttpParams();
    params = params.append("inizio", inizio);
    params = params.append("fine", fine);
    return this.http.get<Mezzo[]>(`${this.mezziUrl}/mezzo/available`, {params: params});
  }

  updateMezzo(mezzo : Mezzo) : Observable<Mezzo>{
    return this.http.put<Mezzo>(`${this.mezziUrl}/mezzo/update`, mezzo);
  }

  deleteMezzo(mezzoId : number) : Observable<Mezzo>{
    return this.http.delete<Mezzo>(`${this.mezziUrl}/mezzo/delete/${mezzoId}`);
  }

  getMezzi() : Observable<Mezzo[]>{
    return this.http.get<Mezzo[]>(`${this.mezziUrl}/mezzo/all`);
  }

  getMezzoFromId(mezzoId: number) : Observable<Mezzo> {
    return this.http.get<Mezzo>(`${this.mezziUrl}/mezzo/${mezzoId}`);
  }

}
