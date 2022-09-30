import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoIntercomComponent } from './video-intercom.component';

describe('VideoIntercomComponent', () => {
  let component: VideoIntercomComponent;
  let fixture: ComponentFixture<VideoIntercomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoIntercomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoIntercomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
