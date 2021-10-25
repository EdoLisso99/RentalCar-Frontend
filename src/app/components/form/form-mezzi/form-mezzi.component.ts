import { Component, OnInit } from '@angular/core';
import {mezziTableConfig, MyHeaders} from "../../../config/MyTableConfig";
import {FormBuilder} from "@angular/forms";
import {MockDataService} from "../../../services/mockData/mock-data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {Mezzo} from "../../../util/Interfaces";
import {emptyMezzo} from "../../../util/MockData";

@Component({
  selector: 'app-form-mezzi',
  templateUrl: './form-mezzi.component.html',
  styleUrls: ['./form-mezzi.component.css']
})
export class FormMezziComponent implements OnInit {

  //TODO Cercare un modo alternativo per passare il type, action e keyObj senza usare sessionStorage
  data: any;
  action !: string | null;
  keyObj : MyHeaders[] = mezziTableConfig.headers;
  formGroup: any;
  mezzoId : number = -1;

  constructor(private formBuilder: FormBuilder, private mockService: MockDataService,
              private readonly router : Router, private location: Location,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.mezzoId = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.action = this.route.snapshot.paramMap.get('action');
    if(this.mezzoId !== -1){
      this.mockService.getMockMezzoFromId(this.mezzoId).subscribe(mezzo => {
        this.data = mezzo;
      });
    }
    else {
      this.data = emptyMezzo;
    }
    this.formGroup = this.formBuilder.group({
      id: this.data['id'],
      annoDiImmatricolazione: this.data['annoDiImmatricolazione'],
      casaCostruttrice: this.data['casaCostruttrice'],
      modello: this.data['modello'],
      targa: this.data['targa'],
      tipo: this.data['tipo'],
    });
  }

  onSubmit(formData:Mezzo) {
    this.mockService.updateMockMezzo(formData).subscribe((x) => {
      this.router.navigate(['home/mezzi']);
    });
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
}
