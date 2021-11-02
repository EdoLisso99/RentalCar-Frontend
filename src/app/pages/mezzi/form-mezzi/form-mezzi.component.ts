import { Component, OnInit } from '@angular/core';
import {MyHeaders} from "../../../config/MyTableConfig";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Mezzo} from "../../../util/Interfaces";
import {MezziService} from "../../../services/mezzi/mezzi.service";

@Component({
  selector: 'app-form-mezzi',
  templateUrl: './form-mezzi.component.html',
  styleUrls: ['./form-mezzi.component.css']
})
export class FormMezziComponent implements OnInit {

  data: any;
  action !: string | null;
  formGroup: any;
  mezzoId : number = -1;

  constructor(private formBuilder: FormBuilder, private mezzoService: MezziService,
              private readonly router : Router, private location: Location,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.mezzoId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.action = this.route.snapshot.paramMap.get('action');
    if(this.mezzoId !== -1){
      this.mezzoService.getMezzoFromId(this.mezzoId).subscribe(mezzo => {
        this.data = mezzo;
        this.formGroup = this.formBuilder.group({
          id: this.data['id'],
          annoDiImmatricolazione: this.data['annoDiImmatricolazione'],
          casaCostruttrice: this.data['casaCostruttrice'],
          modello: this.data['modello'],
          targa: this.data['targa'],
          tipo: this.data['tipo'],
        });
      }, (error => {
        alert("Si è verificato un errore nel recuperare il Mezzo dal DB!");
        console.log(error);
      }));
    }
    else {
      this.data = new Mezzo();
      this.formGroup = this.formBuilder.group({
        id: this.data['id'],
        annoDiImmatricolazione: this.data['annoDiImmatricolazione'],
        casaCostruttrice: this.data['casaCostruttrice'],
        modello: this.data['modello'],
        targa: this.data['targa'],
        tipo: this.data['tipo'],
      });
    }
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

  onSubmit(formData:Mezzo) {
    formData.annoDiImmatricolazione = new Date(formData.annoDiImmatricolazione);
    this.mezzoService.updateMezzo(formData).subscribe((x) => {
      this.router.navigate(['home/mezzi']);
      alert(this.action + " del mezzo " + formData.casaCostruttrice + " " + formData.modello + " effettuato con successo!");
    }, (error => {
      alert("Si è verificato un errore nel " + this.action + " del Mezzo");
      console.log(error);
    }));
  }

}
