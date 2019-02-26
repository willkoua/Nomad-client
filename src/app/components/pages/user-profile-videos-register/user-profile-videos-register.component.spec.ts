import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileVideosRegisterComponent } from './user-profile-videos-register.component';

describe('UserProfileVideosRegisterComponent', () => {
  let component: UserProfileVideosRegisterComponent;
  let fixture: ComponentFixture<UserProfileVideosRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileVideosRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileVideosRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
