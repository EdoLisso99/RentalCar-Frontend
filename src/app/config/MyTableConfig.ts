export interface MyTableConfig {
  headers: MyHeaders[];
  order: MyOrder;
  search: MySearch;
  pagination: MyPagination;
  actions: MyTableActionEnum[];
  type: string;
}

export enum MyTableActionEnum{
  NEW_ROW, EDIT, DELETE
}

export interface MyHeaders {
  key: string;
  label: string;
}

export interface MyOrder {
  defaultColumn: string;
  orderType: string;
}

export interface MySearch {
  columns: string[];
}

export interface MyPagination {
  itemPerPage: number;
  itemPerPageOptions: number[];
}

export const  userTableConfig : MyTableConfig = {
  headers: [
    {key: 'nome', label: 'Nome'},
    {key: 'cognome', label: 'Cognome'},
    {key: 'dataDiNascita', label: 'Data di Nascita'},
    {key: 'ruolo', label: 'Ruolo'},
  ],
  order:
    {
      defaultColumn: 'nome',
      orderType: 'up'
    },
  search:
    {
      columns: ['nome', 'cognome', 'dataDiNascita', 'ruolo']
    },
  pagination:
    {
      itemPerPage: 3,
      itemPerPageOptions: [0]
    },
  actions:[
    MyTableActionEnum.EDIT,
    MyTableActionEnum.DELETE,
    MyTableActionEnum.NEW_ROW
  ],
  type: 'Utente'

}

export const  mezziTableConfig : MyTableConfig = {
  headers: [
    {key: 'annoDiImmatricolazione', label: 'Anno di Immatricolazione'},
    {key: 'casaCostruttrice', label: 'Casa Costruttrice'},
    {key: 'modello', label: 'Modello'},
    {key: 'targa', label: 'Targa'},
    {key: 'tipo', label: 'Tipo'},
  ],
  order:
    {
      defaultColumn: 'nome',
      orderType: 'up'
    },
  search:
    {
      columns: ['casaCostruttrice', 'modello', 'tipo', 'annoDiImmatricolazione']
    },
  pagination:
    {
      itemPerPage: 3,
      itemPerPageOptions: [0]
    },
  actions:[
    MyTableActionEnum.EDIT,
    MyTableActionEnum.DELETE,
    MyTableActionEnum.NEW_ROW
  ],
  type: 'Mezzo'

}

export const  prenotazioniTableConfig : MyTableConfig = {
  headers: [
    {key: 'nome', label: 'Nome'},
    {key: 'cognome', label: 'Cognome'},
    {key: 'dataDiNascita', label: 'Data di Nascita'},
    {key: 'ruolo', label: 'Ruolo'},
  ],
  order:
    {
      defaultColumn: 'nome',
      orderType: 'up'
    },
  search:
    {
      columns: ['nome', 'cognome', 'dataDiNascita', 'ruolo']
    },
  pagination:
    {
      itemPerPage: 3,
      itemPerPageOptions: [0]
    },
  actions:[
    MyTableActionEnum.EDIT,
    MyTableActionEnum.DELETE,
    MyTableActionEnum.NEW_ROW
  ],
  type: 'Prenotazione'

}
