import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserVideoComponent } from './profile-user-video.component';

describe('ProfileUserVideoComponent', () => {
  let component: ProfileUserVideoComponent;
  let fixture: ComponentFixture<ProfileUserVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
