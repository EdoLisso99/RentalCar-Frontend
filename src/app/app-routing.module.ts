import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {UtentiComponent} from "./components/utenti/utenti.component";
import {MezziComponent} from "./components/mezzi/mezzi.component";
import {PrenotazioniComponent} from "./components/prenotazioni/prenotazioni.component";
import {FormUtentiComponent} from "./components/form/form-utenti/form-utenti.component";
import {FormMezziComponent} from "./components/form/form-mezzi/form-mezzi.component";
import {FormPrenotazioniComponent} from "./components/form/form-prenotazioni/form-prenotazioni.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: 'utenti', component: UtentiComponent},
      {path: 'utenti/edit/:id', component: FormUtentiComponent},
      {path: 'utenti/new/:id', component: FormUtentiComponent},
      {path: 'mezzi/edit/:id', component: FormMezziComponent},
      {path: 'mezzi/new/:id', component: FormMezziComponent},
      {path: 'prenotazioni/edit/:id', component: FormPrenotazioniComponent},
      {path: 'prenotazioni/new/:id', component: FormPrenotazioniComponent},
      { path: 'mezzi', component: MezziComponent },
      { path: 'prenotazioni', component: PrenotazioniComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
