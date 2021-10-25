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
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import { InMemoryDataService } from "./services/inMemoryData/in-memory-data.service";
import {HttpClientModule} from "@angular/common/http";
import { UpdateMezziComponent } from './components/update/update-mezzi/update-mezzi.component';
import { UpdateUtentiComponent } from './components/update/update-utenti/update-utenti.component';
import { UpdatePrenotazioniComponent } from './components/update/update-prenotazioni/update-prenotazioni.component';
import { UtentiComponent} from "./pages/utenti/utenti.component";
import { MezziComponent} from "./pages/mezzi/mezzi.component";
import { PrenotazioniComponent} from "./pages/prenotazioni/prenotazioni.component";
import { FormMezziComponent } from './components/form/form-mezzi/form-mezzi.component';
import { FormUtentiComponent } from './components/form/form-utenti/form-utenti.component';
import { FormPrenotazioniComponent } from './components/form/form-prenotazioni/form-prenotazioni.component';
import {DatePipe} from "./pipes/DatePipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    TableComponent,
    LoginComponent,
    UpdateMezziComponent,
    UpdateUtentiComponent,
    UpdatePrenotazioniComponent,
    UtentiComponent,
    MezziComponent,
    PrenotazioniComponent,
    FormMezziComponent,
    FormUtentiComponent,
    FormPrenotazioniComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
