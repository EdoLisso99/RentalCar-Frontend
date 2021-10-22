import {formatDate} from '@angular/common';



export const emptyUser  = [
  {
    id: -1,
    nome: '',
    cognome: '',
    dataDiNascita: '',
    ruolo: ''
  },
]

export const emptyMezzo = {
  id: -1,
  annoDiImmatricolazione: '',
  casaCostruttrice: '',
  modello: '',
  targa: '',
  tipo: ''
}

export const emptyPrenotazione = {
    id: -1,
    dataDiInizio: '',
    dataDiFine: '',
    accettata: null,
    auto: -1,
    utente: -1
}

export const mockUser  = [
  {
    id: 1,
    nome: 'Edoardo',
    cognome: 'Lissoni',
    dataDiNascita: formatDate(new Date('1999/04/12'),  'yyyy/MM/dd',"en-US"),
    ruolo: 'SuperUser'
  },
  {
    id: 3,
    nome: 'Fabio',
    cognome: 'Yong',
    dataDiNascita: formatDate(new Date('1998/07/27'),  'yyyy/MM/dd',"en-US"),
    ruolo: 'Customer'
  },
  {
    id: 4,
    nome: 'Manuel',
    cognome: 'Tocchi',
    dataDiNascita: formatDate(new Date('1996/06/19'),  'yyyy/MM/dd',"en-US"),
    ruolo: 'Customer'
  },
  {
    id: 5,
    nome: 'Alessio',
    cognome: 'Popolo',
    dataDiNascita: formatDate(new Date('1997/02/11'),  'yyyy/MM/dd',"en-US"),
    ruolo: 'Customer'
  },
  {
    id: 6,
    nome: 'Carlo',
    cognome: 'D\'Amato',
    dataDiNascita: formatDate(new Date('1994/02/04'),  'yyyy/MM/dd',"en-US"),
    ruolo: 'Customer'
  },
  {
    id: 2,
    nome: 'Giulia',
    cognome: 'Bellinzona',
    dataDiNascita: formatDate(new Date('1995/11/01'),  'yyyy/MM/dd',"en-US"),
    ruolo: 'Customer'
  }
];

export  const mockAuto = [
  {
    id: 1,
    annoDiImmatricolazione: formatDate(new Date('2018/01/01'),  'yyyy/MM/dd',"en-US"),
    casaCostruttrice: 'Fiat',
    modello: 'Panda',
    targa: 'TF847JY',
    tipo: 'Utilitaria'
  },
  {
    id: 2,
    annoDiImmatricolazione: formatDate(new Date('2015/01/01'),  'yyyy/MM/dd',"en-US"),
    casaCostruttrice: 'Ford',
    modello: 'Fiesta',
    targa: 'SY877ZX',
    tipo: 'Auto di Lusso'
  },
  {
    id: 3,
    annoDiImmatricolazione: formatDate(new Date('2001/01/01'),  'yyyy/MM/dd',"en-US"),
    casaCostruttrice: 'Subaru',
    modello: 'Baracca',
    targa: 'AM766QC',
    tipo: 'Familiare'
  },
  {
    id: 4,
    annoDiImmatricolazione: formatDate(new Date('2012/01/01'),  'yyyy/MM/dd',"en-US"),
    casaCostruttrice: 'Hyundai',
    modello: 'i10',
    targa: 'KE341NF',
    tipo: 'Minivan'
  },
  {
    id: 5,
    annoDiImmatricolazione: formatDate(new Date('2013/01/01'),  'yyyy/MM/dd',"en-US"),
    casaCostruttrice: 'Opel',
    modello: 'Astra',
    targa: 'PW017VB',
    tipo: 'Familiare'
  },
  {
    id: 6,
    annoDiImmatricolazione: formatDate(new Date('2000/01/01'),  'yyyy/MM/dd',"en-US"),
    casaCostruttrice: 'Kia',
    modello: 'Picanto',
    targa: 'RF633GF',
    tipo: 'Utilitaria'
  }
];

export const mockPrenotazioni = [
  {
    id: 1,
    dataDiInizio: formatDate(new Date('2021/10/19'),  'yyyy/MM/dd',"en-US"),
    dataDiFine: formatDate(new Date('2021/10/20'),  'yyyy/MM/dd',"en-US"),
    accettata: true,
    auto: 2,
    utente: 3
  },
  {
    id: 2,
    dataDiInizio: formatDate(new Date('2021/10/31'),  'yyyy/MM/dd',"en-US"),
    dataDiFine: formatDate(new Date('2021/11/03'),  'yyyy/MM/dd',"en-US"),
    accettata: null,
    auto: 4,
    utente: 1
  },
  {
    id: 3,
    dataDiInizio: formatDate(new Date('2021/09/08'),  'yyyy/MM/dd',"en-US"),
    dataDiFine: formatDate(new Date('2021/09/16'),  'yyyy/MM/dd',"en-US"),
    accettata: true,
    auto: 1,
    utente: 6
  },
  {
    id: 4,
    dataDiInizio: formatDate(new Date('2021/10/16'),  'yyyy/MM/dd',"en-US"),
    dataDiFine: formatDate(new Date('2021/10/17'),  'yyyy/MM/dd',"en-US"),
    accettata: null,
    auto: 5,
    utente: 5
  },
  {
    id: 5,
    dataDiInizio: formatDate(new Date('2021/12/24'),  'yyyy/MM/dd',"en-US"),
    dataDiFine: formatDate(new Date('2021/12/26'),  'yyyy/MM/dd',"en-US"),
    accettata: false,
    auto: 3,
    utente: 2
  }
];

