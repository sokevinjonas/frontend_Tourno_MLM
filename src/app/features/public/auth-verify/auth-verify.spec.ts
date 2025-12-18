import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthVerify } from './auth-verify';

describe('AuthVerify', () => {
  let component: AuthVerify;
  let fixture: ComponentFixture<AuthVerify>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthVerify]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthVerify);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
