import {Pipe, PipeTransform} from "@angular/core";
import {formatDate} from "@angular/common";
import {isValidDate} from "../util/Functions";

@Pipe({name: 'showData'})
export class DatePipe implements PipeTransform{
  transform(date: any): any {
    let x = new Date(date);
    if(isValidDate(x)){
      return formatDate(new Date(date), 'dd/MM/yyyy',"en-US");
    }
    else {
    return date;
    }
  }

}
