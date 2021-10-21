import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMezziComponent } from './update-mezzi.component';

describe('UpdateMezziComponent', () => {
  let component: UpdateMezziComponent;
  let fixture: ComponentFixture<UpdateMezziComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMezziComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMezziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
