import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcusenseComponent } from './acusense.component';

describe('AcusenseComponent', () => {
  let component: AcusenseComponent;
  let fixture: ComponentFixture<AcusenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcusenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcusenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
