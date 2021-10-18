import {Component, Input, OnInit} from '@angular/core';
import {MyTableConfig} from "../../config/MyTableConfig";
import { Output, EventEmitter } from '@angular/core';
import {mockAuto, mockUser} from "../../util/MockData";
import {MockDataService} from "../../services/mock-data.service";

import * as _ from 'lodash-es';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input () tableConfig !: MyTableConfig ;
  @Output() updateElement = new EventEmitter<any>();
  @Output() deleteElement = new EventEmitter<any>();
  @Output() createElement = new EventEmitter<any>();

  updateCertainElement(value: any){
    this.updateElement.emit(value);
  }
  deleteCertainElement(value: any){
    this.deleteElement.emit(value);
  }

  createCertainElement(){
    this.createElement.emit();
  }

  isColumnSelected = false;
  filter = '';
  isFilterApplied = false;
  pageSelected = 0;

  // mockData : any[] = this.tableConfig.type == 'Utente' ? mockUser : mockAuto ;
  mockData : any[] = [];

  backupData = this.mockData;

  //Restituisce i nomi dei parametri di un array di oggetti
  getKey(data: any[]) : string[]{
    if(data.length == 0){
      return [];
    }
    else {
      return Object.keys(data[0]);
    }
  }

  getValuesFromParameter(data: any, params : string) : string[] {
    return data[params];
  }

  //Cambia l'icona e la sua posizione in base alla colonna e all'ordine selezionati
  changeColumn(colName : string, orderMethod : string, data : any[]) : any[]{
    this.tableConfig.order.defaultColumn = colName;
    let multiplier = 1;
    if(orderMethod == 'up'){
      this.tableConfig.order.orderType = 'down';
      multiplier = -1;
    }
    else{
      this.tableConfig.order.orderType = 'up';
      multiplier = 1;
    }
    return  data.sort((a,b) => (a[colName] > b[colName]) ? multiplier : ((b[colName] > a[colName]) ? -(multiplier) : 0))
  }

  filterData(appliedFilter : string){
    if(appliedFilter.trim() !== ''){
      let container : any[] = [];
      this.tableConfig.search.columns.map(value => {
        container = [...container, _.filter(this.backupData, {[value] : appliedFilter})];
        console.log(container);
      });
      this.mockData = container.filter(x => x.length !== 0)[0];
      this.isFilterApplied = true;
    }
    else {
      this.mockData = this.backupData;
      this.isFilterApplied = false;
    }
    this.changePages();
  }

  changePages(){
    if(this.mockData.length % this.tableConfig.pagination.itemPerPage !== 0 ){
      this.tableConfig.pagination.itemPerPageOptions = [...Array(Math.round(this.mockData.length / this.tableConfig.pagination.itemPerPage) + 1).keys()];
    }
    else {
      this.tableConfig.pagination.itemPerPageOptions = [...Array(this.mockData.length / this.tableConfig.pagination.itemPerPage).keys()];
    }
  }

  constructor(private mockService : MockDataService) {
  }

  ngOnInit(): void {
    this.changePages();
    if(this.tableConfig.type == 'Utente'){
      this.getUtenti();
    }
    else {
      this.getMezzi();
    }
  }

  contains(array:any[], value:any) : boolean{
    let flag = false;
    array.map(element => {
      if(element == value){
        flag = true;
      }
    })
    return flag;
  }

  resetFilters(){
    this.mockData = this.backupData;
    this.isFilterApplied = false;
    this.filter = '';
    this.changePages();
  }

  getUtenti(){
    // this.mockService.getMockUsers().subscribe(user => this.mockData = user);
    this.mockData = mockUser;
    this.backupData = mockUser;

    let x = '';
  }

  getMezzi(){
    // this.mockService.getMockMezzi().subscribe(mezzo => this.mockData = mezzo);
    this.mockData = mockAuto;
    this.backupData = mockAuto;
    let x = '';

  }

  containsValue(cmd: any) : boolean {
    return Object.values(this.tableConfig.actions).includes(cmd);
  }

}
