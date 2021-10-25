export interface MyButtonConfig{
  customCssClass : string,
  text : string,
  icon : string,
  color: string,
  action?: any

}

export const createBtn : MyButtonConfig = {
  customCssClass : 'btn-warning',
  text : 'Create new element',
  icon : '',
  color: "",
}

export const filterBtn : MyButtonConfig = {
  customCssClass : 'btn-info',
  text : 'Filter available vehicles',
  icon : 'fas fa-calendar-day',
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
