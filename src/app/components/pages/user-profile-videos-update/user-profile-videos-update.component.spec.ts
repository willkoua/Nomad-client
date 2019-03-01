import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileVideosUpdateComponent } from './user-profile-videos-update.component';

describe('UserProfileVideosUpdateComponent', () => {
  let component: UserProfileVideosUpdateComponent;
  let fixture: ComponentFixture<UserProfileVideosUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileVideosUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileVideosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
