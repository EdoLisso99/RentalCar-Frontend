export function dateOverlaps (inizio: Date, fine : Date, inizioO: Date, fineO: Date) : boolean{
   let a = inizioO <= inizio;
   let b = fineO <= inizio;
   let c = fine <= inizioO;
   let d = fine <= fineO;
  return  (a && b) || (c && d);
}

export function hideBtn(condition: any, data: any, loggedUser: any) : boolean {
  if(loggedUser !== null){
    let ruolo : string = loggedUser.ruolo;
    let conditions = [false, false, false];
    if(condition[ruolo].anyHow == true){
      if(condition[ruolo].notSameId){
        conditions[0] = loggedUser.id == data.id;
      }
      else {
        conditions[0] = false;
      }
      if(condition[ruolo].twoDays){
        let dayAfterTomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 2);
        conditions[1] = data.dataDiInizio <= dayAfterTomorrow;
      }
      else {
        conditions[1] = false;
      }
      if(condition[ruolo].yetApproved){
        conditions[2] = data.accettata !== null;
      }
      else {
        conditions[2] = false;
      }
      return conditions[0] || conditions[1] || conditions[2];
    }
    else {
      return true;
    }
  }
  return false;
}
