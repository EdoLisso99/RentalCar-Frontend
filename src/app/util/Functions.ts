export function dateOverlaps (inizio: Date, fine : Date, inizioO: Date, fineO: Date) : boolean{
   let a = inizioO <= inizio;
   let b = fineO <= inizio;
   let c = fine <= inizioO;
   let d = fine <= fineO;
   let flag = (a && b) || (c && d);
   return  flag;
}
