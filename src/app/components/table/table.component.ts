import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MyHeaders, MyTableActionEnum, MyTableConfig} from "../../config/MyTableConfig";
import * as _ from 'lodash';
import {Utente} from "../../util/Interfaces";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input () tableConfig !: MyTableConfig ;
  @Input() mockData !: any[];

  @Output() onClickEvent = new EventEmitter<any>();

  isColumnSelected = false;
  filter = '';
  isFilterApplied = false;
  pageSelected = 0;
  dropdownHidden = true;
  pageArrayOptions : number[] = [];
  backupData: any[] = [];
  loggedUser: Utente = JSON.parse(sessionStorage.getItem('loggedUser')!);

  constructor() {
  }

  ngOnInit(): void {
    this.changePages();
  }

  ngOnChanges(changes:SimpleChanges): void{
    if(changes.mockData){
      this.mockData = changes.mockData.currentValue;
      this.backupData = this.mockData;
      this.changePages();
    }
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

  changePages(){
    this.pageArrayOptions = [...Array(Math.ceil(this.mockData.length / this.tableConfig.pagination.itemPerPage)).keys()];
    if(this.pageArrayOptions.length < (this.pageSelected + 1)){
      this.pageSelected = 0;
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

  filterData(appliedFilter : string){
    if(appliedFilter.trim() !== ''){
      let container : any[] = [];
      this.tableConfig.search.columns.map(value => {
        this.backupData.forEach(obj => {
          if(_.get(obj, value) == appliedFilter){
            container = [...container, obj];
          }
        })
      });
      this.mockData = container.filter(x => x.length !== 0);
      this.isFilterApplied = true;
    }
    else {
      this.mockData = this.backupData;
      this.isFilterApplied = false;
    }
    this.changePages();
  }

  prova (data: any, filter: string, container: any[]){
    if(Array.isArray(data)){
      data.forEach((elem: any) => {
        for(const prop in elem){
          if(typeof elem[prop] == 'object'){
            this.prova(elem[prop], filter, container);
          }
          else {
            if(elem[prop] == filter){
              container.push(elem);
            }
          }
        }
      })
    }
    else {
      for(const prop in data){
        if(typeof data[prop] == 'object'){
          this.prova(data[prop], filter, container);
        }
        else {
          if(data[prop] == filter){
            container.push(data);
          }
        }
      }
    }
  }

  getDepthOfArray(array: any) : number{
    if(!Array.isArray(array)){
      return 0;
    }
    else {
      return this.getDepthOfArray(array[0]) + 1;
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

  resetFilters(){
    this.mockData = this.backupData;
    this.isFilterApplied = false;
    this.filter = '';
    this.changePages();
  }

  sendOnClickEvent(data:any, action: MyTableActionEnum){
    this.onClickEvent.emit({data: data, action:action});
  }

  showItem(option: number) {
    this.tableConfig.pagination.itemPerPage = option;
    this.dropdownHidden = !this.dropdownHidden;
    this.changePages();
  }

}
