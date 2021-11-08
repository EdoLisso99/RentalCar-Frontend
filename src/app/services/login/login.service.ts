import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return sessionStorage.getItem('token')!;
  }

  login(username: string, password: string) : Observable<any> {
    let params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    let token = this.http.post(`${this.userUrl}/login`,
      params.toString(),
      {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': 'http://localhost:4200',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET,POST,DELETE,PUT,OPTIONS',
          'Content-Type': 'application/x-www-form-urlencoded',
        })
      }
    );
    return token;
  }

}
