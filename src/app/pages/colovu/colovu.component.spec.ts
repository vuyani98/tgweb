import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColovuComponent } from './colovu.component';

describe('ColovuComponent', () => {
  let component: ColovuComponent;
  let fixture: ComponentFixture<ColovuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColovuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColovuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
