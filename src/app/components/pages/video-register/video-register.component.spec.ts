import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRegisterComponent } from './video-register.component';

describe('VideoRegisterComponent', () => {
  let component: VideoRegisterComponent;
  let fixture: ComponentFixture<VideoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
