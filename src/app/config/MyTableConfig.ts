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
  customCssClass?: string,
  hidden: any
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
      hidden: () => false
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
    hidden: (data: any, loggedUser: any) => {
      return loggedUser.ruolo === 'Customer';

    }
  },
    {
      action: MyTableActionEnum.DELETE,
      customCssClass : 'btn-light',
      text : '',
      icon : 'fas fa-trash',
      color: "tomato",
      hidden: (data: any, loggedUser: any) => {
        if(loggedUser.ruolo !== 'Customer'){
          return data.id === loggedUser.id;
        }
        return true;
      }
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
      hidden: (data: any, loggedUser: any) => {
        return loggedUser.ruolo === 'Customer';

      }
    },
    {
      action: MyTableActionEnum.DELETE,
      customCssClass : 'btn-light',
      text : '',
      icon : 'fas fa-trash',
      color: "tomato",
      hidden: (data: any, loggedUser: any) => {
        return loggedUser.ruolo === 'Customer';

      }
    },
    {
      action: MyTableActionEnum.BOOK,
      customCssClass : 'btn-info',
      text : 'Book',
      icon : 'fas fa-car',
      color: "",
      hidden: (data: any, loggedUser: any) => {
        return loggedUser.ruolo === 'SuperUser';

      }
    },
  ],
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
    action: MyTableActionEnum.EDIT,
    customCssClass : 'btn-light',
    text : '',
    icon : 'fas fa-pencil-alt',
    color: "mediumslateblue",
    hidden: (data: any, loggedUser: any) => {
      if(loggedUser.ruolo == 'Customer'){
        let x = new Date();
        x.setDate(x.getDate() + 2);
        return new Date(data.dataDiInizio) < x;
      }
      return true;
    }
  },
    {
      action: MyTableActionEnum.APPROVE,
      customCssClass : 'btn-success',
      text : 'Approve',
      icon : 'fas fa-heart',
      color: "",
      hidden: (data: any, loggedUser: any) => {
        if(loggedUser.ruolo == 'SuperUser'){
          return data.accettata !== null;
        }
        return true;
      }
    },
    {
      action: MyTableActionEnum.REJECT,
      customCssClass : 'btn-danger',
      text : 'Decline',
      icon : 'fas fa-skull',
      color: "",
      hidden: (data: any, loggedUser: any) => {
        if(loggedUser.ruolo == 'SuperUser'){
          return data.accettata === null;
        }
        return true;
      }
    },
    {
      action: MyTableActionEnum.DELETE,
      customCssClass: 'btn-light',
      text: '',
      icon: 'fas fa-trash',
      color: "tomato",
      hidden: (data: any, loggedUser: any) => {
        if(loggedUser.ruolo == 'Customer'){
          let x = new Date();
          x.setDate(x.getDate() + 2);
          return new Date(data.dataDiInizio) < x;
        }
        return true;
      }
    }
  ],
  type: 'Prenotazione'
}
