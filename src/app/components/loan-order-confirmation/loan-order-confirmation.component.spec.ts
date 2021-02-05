import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanOrderConfirmationComponent } from './loan-order-confirmation.component';

describe('LoanOrderConfirmationComponent', () => {
  let component: LoanOrderConfirmationComponent;
  let fixture: ComponentFixture<LoanOrderConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanOrderConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanOrderConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
