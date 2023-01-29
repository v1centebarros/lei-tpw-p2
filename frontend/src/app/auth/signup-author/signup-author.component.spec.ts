import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAuthorComponent } from './signup-author.component';

describe('SignupAuthorComponent', () => {
  let component: SignupAuthorComponent;
  let fixture: ComponentFixture<SignupAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
