import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAccounts } from './game-accounts';

describe('GameAccounts', () => {
  let component: GameAccounts;
  let fixture: ComponentFixture<GameAccounts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameAccounts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameAccounts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
