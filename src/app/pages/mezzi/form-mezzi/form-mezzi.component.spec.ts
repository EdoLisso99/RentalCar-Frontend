import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMezziComponent } from './form-mezzi.component';

describe('FormMezziComponent', () => {
  let component: FormMezziComponent;
  let fixture: ComponentFixture<FormMezziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMezziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMezziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
