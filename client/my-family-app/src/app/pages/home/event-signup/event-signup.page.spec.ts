import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventSignupPage } from './event-signup.page';

describe('EventSignupPage', () => {
  let component: EventSignupPage;
  let fixture: ComponentFixture<EventSignupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
