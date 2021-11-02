import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'showData'})
export class DatePipe implements PipeTransform{
  transform(obj: any): any {
    if(obj !== null){
      if(!isNaN(Date.parse(obj))){
        let x = new Date(obj);
        return x.toISOString().split('T')[0];
      }
    }
    return obj;
  }
}
