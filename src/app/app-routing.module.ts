import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {UtentiComponent} from "./pages/utenti/utenti.component";
import {MezziComponent} from "./pages/mezzi/mezzi.component";
import {PrenotazioniComponent} from "./pages/prenotazioni/prenotazioni.component";
import {FormUtentiComponent} from "./components/form/form-utenti/form-utenti.component";
import {FormMezziComponent} from "./components/form/form-mezzi/form-mezzi.component";
import {FormPrenotazioniComponent} from "./components/form/form-prenotazioni/form-prenotazioni.component";

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
