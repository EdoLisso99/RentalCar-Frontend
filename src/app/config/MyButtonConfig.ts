export interface MyButtonConfig{
  customCssClass : string,
  text : string,
  icon : string,
  color: string,

}

export const updateBtn : MyButtonConfig = {
  customCssClass : 'btn-light',
  text : '',
  icon : 'fas fa-pencil-alt',
  color: "mediumslateblue",
}

export const approveBtn : MyButtonConfig = {
  customCssClass : 'btn-success',
  text : 'Approve',
  icon : 'fas fa-heart',
  color: "",
}

export const bookBtn : MyButtonConfig = {
  customCssClass : 'btn-info',
  text : 'Book',
  icon : 'fas fa-car',
  color: "",
}

export const rejectBtn : MyButtonConfig = {
  customCssClass : 'btn-danger',
  text : 'Decline',
  icon : 'fas fa-skull',
  color: "",
}

export const deleteBtn : MyButtonConfig = {
  customCssClass : 'btn-light',
  text : '',
  icon : 'fas fa-trash',
  color: "tomato",
}

export const createBtn : MyButtonConfig = {
  customCssClass : 'btn-warning',
  text : 'Create new element',
  icon : '',
  color: "",
}

export const selectBtn : MyButtonConfig = {
  customCssClass : 'btn-success',
  text : 'Sono io! ',
  icon : 'fas fa-check',
  color: "",
}
export const logoutBtn : MyButtonConfig = {
  customCssClass : 'btn-danger',
  text : 'Logout ',
  icon : 'fas fa-sign-out-alt',
  color: "",
}
export const emptyBtn : MyButtonConfig = {
  customCssClass : '',
  text : '',
  icon : '',
  color: "",
}
