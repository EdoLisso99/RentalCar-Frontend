import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent} from "./pages/home/home.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonComponent } from './components/button/button.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TableComponent } from './components/table/table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent} from "./pages/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { UtentiComponent} from "./pages/utenti/component/utenti.component";
import { MezziComponent} from "./pages/mezzi/component/mezzi.component";
import { PrenotazioniComponent} from "./pages/prenotazioni/component/prenotazioni.component";
import { FormMezziComponent } from './pages/mezzi/form-mezzi/form-mezzi.component';
import { FormUtentiComponent } from './pages/utenti/form-utenti/form-utenti.component';
import { FormPrenotazioniComponent } from './pages/prenotazioni/form-prenotazioni/form-prenotazioni.component';
import {InterceptorService} from "./services/interceptor/interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    TableComponent,
    LoginComponent,
    UtentiComponent,
    MezziComponent,
    PrenotazioniComponent,
    FormMezziComponent,
    FormUtentiComponent,
    FormPrenotazioniComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
