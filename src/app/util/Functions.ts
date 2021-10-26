export function dateOverlaps (inizio: Date, fine : Date, inizioO: Date, fineO: Date) : boolean{
   let a = inizioO <= inizio;
   let b = fineO <= inizio;
   let c = fine <= inizioO;
   let d = fine <= fineO;
   let flag = (a && b) || (c && d);
   let x = '';
   return  flag;
}

export function isValidDate(d: any) {
  // @ts-ignore
  return d instanceof Date && !isNaN(d);
}
