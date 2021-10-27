export interface Utente {
  id: number,
  nome: string,
  cognome: string,
  dataDiNascita: any,
  ruolo: string
}

export interface Mezzo {
  id: number,
  annoDiImmatricolazione: any,
  casaCostruttrice: string,
  modello: string,
  targa: string,
  tipo: string,
}

export interface Prenotazione {
  id: number,
  dataDiInizio: any,
  dataDiFine: any,
  accettata: boolean,
  auto: any,
  utente: any

}
