import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'showData'})
export class DatePipe implements PipeTransform{
  transform(obj: any): any {
    if(obj !== null){
      if(typeof  obj == 'object'){
        if(obj.nome !== undefined){
          return (obj.nome + " " + obj.cognome);
        }
        if(obj.modello !== undefined){
          return (obj.casaCostruttrice + " " + obj.modello + " " + obj.targa);
        }
      }
      let y = Date.parse(obj);
      if(!isNaN(Date.parse(obj))){
        let x = new Date(obj);
        return x.toISOString().split('T')[0];
      }
    }
    return obj;

  }

}
