import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMessagePage } from './new-message.page';

describe('NewMessagePage', () => {
  let component: NewMessagePage;
  let fixture: ComponentFixture<NewMessagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
