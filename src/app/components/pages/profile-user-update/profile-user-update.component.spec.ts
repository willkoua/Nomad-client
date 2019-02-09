import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserUpdateComponent } from './profile-user-update.component';

describe('ProfileUserUpdateComponent', () => {
  let component: ProfileUserUpdateComponent;
  let fixture: ComponentFixture<ProfileUserUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
