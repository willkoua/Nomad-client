import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVideoComponent } from './register-video.component';

describe('RegisterVideoComponent', () => {
  let component: RegisterVideoComponent;
  let fixture: ComponentFixture<RegisterVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
