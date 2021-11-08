import {Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';


@Pipe({name: 'showData'})
export class DatePipe implements PipeTransform{
  transform(obj: any): any {
    if(obj !== null){
      if(!isNaN(Date.parse(obj)) && moment(obj, "yyyy-MM-dd", true).isValid()){
        let x = new Date(obj);
        return x.toISOString().split('T')[0];
      }
    }
    return obj;
  }
}

// @Pipe({name: 'showData'})
// export class DatePipe implements PipeTransform{
//   transform(obj: any): any {
//     if(moment(obj, "yyyy-MM-dd", true).isValid()){
//       let x = new Date(obj);
//       let y = x.toISOString().split('T')[0];
//       return y;
//     }
//     return obj;
//   }
// }
