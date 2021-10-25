import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUtentiComponent } from './form-utenti.component';

describe('FormUtentiComponent', () => {
  let component: FormUtentiComponent;
  let fixture: ComponentFixture<FormUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUtentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
