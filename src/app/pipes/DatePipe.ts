import {Pipe, PipeTransform} from "@angular/core";
import {formatDate} from "@angular/common";

@Pipe({name: 'showData'})
export class DatePipe implements PipeTransform{
  transform(date: any): any {
    let x = typeof date;
    if(typeof date === "object" && date !== null){
      return formatDate(date, 'dd/MM/yyyy',"en-US");
    }
    else {
    return date;
    }
  }

}
