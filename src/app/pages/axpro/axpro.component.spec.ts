import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxproComponent } from './axpro.component';

describe('AxproComponent', () => {
  let component: AxproComponent;
  let fixture: ComponentFixture<AxproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AxproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AxproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
