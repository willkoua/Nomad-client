import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserHeaderComponent } from './profile-user-header.component';

describe('ProfileUserHeaderComponent', () => {
  let component: ProfileUserHeaderComponent;
  let fixture: ComponentFixture<ProfileUserHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileUserHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
