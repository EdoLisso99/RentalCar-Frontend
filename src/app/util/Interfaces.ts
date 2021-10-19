export interface Utente {
  id: number,
  nome: string,
  cognome: string,
  dataDiNascita: string,
  ruolo: string
}

export interface Mezzo {
  id: number,
  annoDiImmatricolazione: string,
  casaCostruttrice: string,
  modello: string,
  targa: string,
  tipo: string
}

export interface Prenotazione {
  id: number,
  dataDiInizio: string,
  dataDiFine: string,
  accettata: Boolean,
  auto: number,
  utente: number

}
