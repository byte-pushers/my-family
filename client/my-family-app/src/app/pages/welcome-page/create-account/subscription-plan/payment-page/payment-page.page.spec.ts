import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentPagePage } from './payment-page.page';

describe('PaymentPagePage', () => {
  let component: PaymentPagePage;
  let fixture: ComponentFixture<PaymentPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
