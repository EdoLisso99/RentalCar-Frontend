import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {UtentiComponent} from "./pages/utenti/component/utenti.component";
import {MezziComponent} from "./pages/mezzi/component/mezzi.component";
import {PrenotazioniComponent} from "./pages/prenotazioni/component/prenotazioni.component";
import {FormUtentiComponent} from "./pages/utenti/form-utenti/form-utenti.component";
import {FormMezziComponent} from "./pages/mezzi/form-mezzi/form-mezzi.component";
import {FormPrenotazioniComponent} from "./pages/prenotazioni/form-prenotazioni/form-prenotazioni.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: 'utenti', component: UtentiComponent},
      {path: 'utenti/:action/:id', component: FormUtentiComponent},
      {path: 'mezzi/:action/:id', component: FormMezziComponent},
      {path: 'prenotazioni/:vehicle/:user/:action/:id', component: FormPrenotazioniComponent},
      { path: 'mezzi', component: MezziComponent },
      { path: 'prenotazioni', component: PrenotazioniComponent },
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
