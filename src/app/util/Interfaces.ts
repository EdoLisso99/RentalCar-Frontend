export class Utente {

  id: number;
  nome: string;
  cognome: string;
  dataDiNascita: any;
  ruolo: string

  constructor() {
    this.id = -1;
    this.nome = '';
    this.cognome = '';
    this.ruolo = '';
    this.dataDiNascita = new Date();
  }

}

export class Mezzo {
  id: number;
  annoDiImmatricolazione: any;
  casaCostruttrice: string;
  modello: string;
  targa: string;
  tipo: string;

  constructor() {
    this.id = -1;
    this.annoDiImmatricolazione = new Date();
    this.casaCostruttrice = '';
    this.modello = '';
    this.targa = '';
    this.tipo = '';
  }
}

export class Prenotazione {

  id: number;
  dataDiInizio: any;
  dataDiFine: any;
  accettata ?: boolean;
  auto: any;
  utente: any

  constructor(obj ?: any) {
    this.id = -1;
    this.accettata = undefined;
    this.dataDiInizio = obj.inizio;
    this.dataDiFine = obj.fine;
    this.auto = obj.auto;
    this.utente = obj.utente;
  }


}

export class DateExample {
  inizio: Date;
  fine: Date;

  constructor(a:Date, b:Date) {
    this.inizio = a;
    this.fine = b;
  }
}
