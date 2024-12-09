import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionPlanPage } from './subscription-plan.page';

describe('SubscriptionPlanPage', () => {
  let component: SubscriptionPlanPage;
  let fixture: ComponentFixture<SubscriptionPlanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
