export function dateOverlaps(start:string, end:string, start1:string, end1:string) : boolean {
  let inizio : Date = new Date(start);
  let fine : Date = new Date(end);
  let inizio1 : Date = new Date(start1);
  let fine1 : Date = new Date(end1);
  return (inizio > inizio1 && inizio < fine1 || fine > inizio1 && fine < fine1 || inizio < inizio1 && fine > fine1);
}
