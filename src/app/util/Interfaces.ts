export interface Utente {
  nome: string,
  cognome: string,
  dataDiNascita: string,
  ruolo: string
}

export interface Mezzo {
  annoDiImmatricolazione: string,
  casaCostruttrice: string,
  modello: string,
  targa: string,
  tipo: string
}

export interface Prenotazione {
  dataDiInizio: string,
  dataDiFine: string,
  accettata: Boolean,
  auto: string,
  utente: string

}
