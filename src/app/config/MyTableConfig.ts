export interface MyTableConfig {
  headers: MyHeaders[];
  order: MyOrder;
  search: MySearch;
  pagination: MyPagination;
  actions: Array<Actions>;
  type: string;
}

export enum MyTableActionEnum {
  NEW_ROW, EDIT, DELETE, SELECT, APPROVE, REJECT, BOOK
}

export interface MyHeaders {
  key: string;
  label: string;
}

export interface MyOrder {
  defaultColumn: string;
  orderType: string;
}

export interface Actions {
  icon?: string,
  action: MyTableActionEnum,
  text?: string,
  color?: string,
  customCssClass?: string
}

export interface MySearch {
  columns: string[];
}

export interface MyPagination {
  itemPerPage: number;
  itemPerPageOptions: number[];
}

export const loginTableConfig: MyTableConfig = {
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
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [
    {
      action: MyTableActionEnum.SELECT,
      customCssClass : 'btn-success',
      text : 'Sono io! ',
      icon : 'fas fa-check',
      color: "",
    }
  ],
  type: 'Utente'

}

export const userTableConfig: MyTableConfig = {
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
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [    {
    action: MyTableActionEnum.EDIT,
    customCssClass : 'btn-light',
    text : '',
    icon : 'fas fa-pencil-alt',
    color: "mediumslateblue",
  },
    {
      action: MyTableActionEnum.DELETE,
      customCssClass : 'btn-light',
      text : '',
      icon : 'fas fa-trash',
      color: "tomato",
    }

  ],
  type: 'Utente'
}

export const userTableConfigCustomer: MyTableConfig = {
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
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [
    {
      action: MyTableActionEnum.EDIT,
      customCssClass : 'btn-light',
      text : '',
      icon : 'fas fa-pencil-alt',
      color: "mediumslateblue",
    }
  ],
  type: 'Utente'
}

export const mezziTableConfig: MyTableConfig = {
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
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [
    {
      action: MyTableActionEnum.EDIT,
      customCssClass : 'btn-light',
      text : '',
      icon : 'fas fa-pencil-alt',
      color: "mediumslateblue",
    },
    {
      action: MyTableActionEnum.DELETE,
      customCssClass : 'btn-light',
      text : '',
      icon : 'fas fa-trash',
      color: "tomato",
    }
  ],
  type: 'Mezzo'

}

export const mezziTableConfigUser: MyTableConfig = {
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
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [{
    action: MyTableActionEnum.BOOK,
    customCssClass : 'btn-info',
    text : 'Book',
    icon : 'fas fa-car',
    color: "",
  }],
  type: 'Mezzo'

}

export const prenotazioniTableConfig: MyTableConfig = {
  headers: [
    {key: 'dataDiInizio', label: 'Data di Inizio'},
    {key: 'dataDiFine', label: 'Data di Fine'},
    {key: 'accettata', label: 'Accettata'},
    {key: 'auto', label: 'Auto'},
    {key: 'utente', label: 'Utente'},
  ],
  order:
    {
      defaultColumn: 'nome',
      orderType: 'up'
    },
  search:
    {
      columns: ['dataDiInizio', 'dataDiFine', 'accettata', 'auto', 'utente']
    },
  pagination:
    {
      itemPerPage: 3,
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [{
    action: MyTableActionEnum.DELETE,
    customCssClass : 'btn-light',
    text : '',
    icon : 'fas fa-trash',
    color: "tomato",
  }],
  type: 'Prenotazione'
}

export const prenotazioniTableConfigUser: MyTableConfig = {
  headers: [
    {key: 'dataDiInizio', label: 'Data di Inizio'},
    {key: 'dataDiFine', label: 'Data di Fine'},
    {key: 'accettata', label: 'Accettata'},
    {key: 'auto', label: 'Auto'},
    {key: 'utente', label: 'Utente'},
  ],
  order:
    {
      defaultColumn: 'nome',
      orderType: 'up'
    },
  search:
    {
      columns: ['dataDiInizio', 'dataDiFine', 'accettata', 'auto', 'utente']
    },
  pagination:
    {
      itemPerPage: 3,
      itemPerPageOptions: [3, 5, 10, 15]
    },
  actions: [{
    action: MyTableActionEnum.EDIT,
    customCssClass : 'btn-light',
    text : '',
    icon : 'fas fa-pencil-alt',
    color: "mediumslateblue",
  }, {
    action: MyTableActionEnum.DELETE,
    customCssClass : 'btn-light',
    text : '',
    icon : 'fas fa-trash',
    color: "tomato",
  }],
  type: 'Prenotazione'
}
