import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileVideosComponent } from './user-profile-videos.component';

describe('UserProfileVideosComponent', () => {
  let component: UserProfileVideosComponent;
  let fixture: ComponentFixture<UserProfileVideosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileVideosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
