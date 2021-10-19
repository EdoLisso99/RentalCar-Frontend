import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MyTableActionEnum, MyTableConfig} from "../../config/MyTableConfig";

import * as _ from 'lodash-es';
import {createBtn, deleteBtn, emptyBtn, MyButtonConfig, updateBtn} from "../../config/MyButtonConfig";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input () tableConfig !: MyTableConfig ;
  @Input() mockData !: any[];
  @Output() onClickEvent = new EventEmitter<any>();

  sendOnClickEvent(data:any, action: MyTableActionEnum){
    this.onClickEvent.emit({data: data, action:action});
  }

  isColumnSelected = false;
  filter = '';
  isFilterApplied = false;
  pageSelected = 0;
  dropdownHidden = true;
  pageArrayOptions : number[] = [];

  // mockData : any[] = this.tableConfig.type == 'Utente' ? mockUser : mockAuto ;

  backupData: any[] = [];

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
    this.pageArrayOptions = [...Array(Math.ceil(this.mockData.length / this.tableConfig.pagination.itemPerPage)).keys()];
    this.pageSelected = 0;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.changePages();
  }

  ngOnChanges(changes:SimpleChanges): void{
    this.mockData = changes.mockData.currentValue;
    this.backupData = this.mockData;
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

  getBtnConfigFromAction(action: MyTableActionEnum) : MyButtonConfig {
        switch (action){
          case MyTableActionEnum.EDIT:
            return updateBtn;
          case MyTableActionEnum.DELETE:
            return deleteBtn;
          case MyTableActionEnum.NEW_ROW:
            return createBtn;
          default:
            return emptyBtn;
        }
  }

  showItem(option: number) {
    this.tableConfig.pagination.itemPerPage = option;
    this.dropdownHidden = !this.dropdownHidden;
    this.changePages();
  }
}
