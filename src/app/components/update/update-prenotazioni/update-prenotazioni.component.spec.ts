import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrenotazioniComponent } from './update-prenotazioni.component';

describe('UpdatePrenotazioniComponent', () => {
  let component: UpdatePrenotazioniComponent;
  let fixture: ComponentFixture<UpdatePrenotazioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePrenotazioniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePrenotazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
