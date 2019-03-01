import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileVideosDetailComponent } from './user-profile-videos-detail.component';

describe('UserProfileVideosDetailComponent', () => {
  let component: UserProfileVideosDetailComponent;
  let fixture: ComponentFixture<UserProfileVideosDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileVideosDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileVideosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
