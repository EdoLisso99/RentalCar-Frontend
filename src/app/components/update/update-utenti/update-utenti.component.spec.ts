import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUtentiComponent } from './update-utenti.component';

describe('UpdateUtentiComponent', () => {
  let component: UpdateUtentiComponent;
  let fixture: ComponentFixture<UpdateUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUtentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
