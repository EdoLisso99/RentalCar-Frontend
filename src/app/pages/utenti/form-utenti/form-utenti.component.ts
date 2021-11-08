import { Component, OnInit } from '@angular/core';
import { MyHeaders} from "../../../config/MyTableConfig";
import { FormBuilder } from '@angular/forms';
import {Utente} from "../../../util/Interfaces";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {UtentiService} from "../../../services/utenti/utenti.service";


@Component({
  selector: 'app-form-utenti',
  templateUrl: './form-utenti.component.html',
  styleUrls: ['./form-utenti.component.css']
})
export class FormUtentiComponent implements OnInit {

  loggedUser : Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);
  data: any;
  action !: string | null;
  formGroup: any;
  userId : number = -1;

  constructor(private formBuilder: FormBuilder, private utenteService: UtentiService,
              private readonly router : Router, private location: Location,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.action = this.route.snapshot.paramMap.get('action');
    if(this.userId !== -1){
      this.utenteService.getUtenteFromId(this.userId).subscribe((user : Utente  ) => {
        this.data = user;
        this.formGroup = this.formBuilder.group({
          id: this.data['id'],
          nome: this.data['nome'],
          cognome: this.data['cognome'],
          dataDiNascita: this.data['dataDiNascita'],
          ruolo: this.data['ruolo'],
          username: this.data['username'],
          password: this.data['password']
        });
      });
    }
    else {
      this.data = new Utente();
      this.formGroup = this.formBuilder.group({
        id: this.data['id'],
        nome: this.data['nome'],
        cognome: this.data['cognome'],
        dataDiNascita: this.data['dataDiNascita'],
        ruolo: this.data['ruolo'],
        username: this.data['username'],
        password: this.data['password']
      });
    }
  }

  onSubmit(formData:Utente) {
    formData.dataDiNascita = new Date(formData.dataDiNascita);
    this.utenteService.updateUtente(formData).subscribe((x) => {
      //Se un customer si modifica devo aggiornare i suoi valori, dato che nella
      //tabella prendo i suoi valori direttamente dalla session storage
      if (formData.ruolo == 'Customer' &&
        JSON.parse(sessionStorage.getItem('loggedUser')!).id == formData.id){
        sessionStorage.removeItem('loggedUser');
        sessionStorage.setItem('loggedUser', JSON.stringify(formData));
      }
      alert(this.action + " dell'utente " + formData.nome + " " + formData.cognome + " effettuato con successo!");
      this.router.navigate(['home/utenti']);
    }, (error => {
        alert("Errore! C'è stato qualche problema con il " + this.action + " dell' Utente");
        console.log(error);
      }
    ));
  }

  //Restituisce i nomi dei parametri di un array di oggetti
  getKey(data: MyHeaders[]) : string[]{
    if(data.length == 0){
      return [];
    }
    else {
      return data.map(element => element.key);
    }
  }

  goBack() {
    this.location.back();
  }

  changeRole(e: Event) {
    // @ts-ignore
    this.formGroup.controls['ruolo'].setValue( e.target.value, {onlySelf: true});
  }
}
