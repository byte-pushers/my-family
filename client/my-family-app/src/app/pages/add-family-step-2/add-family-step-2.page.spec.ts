import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFamilyStep2Page } from './add-family-step-2.page';

describe('AddFamilyStep2Page', () => {
  let component: AddFamilyStep2Page;
  let fixture: ComponentFixture<AddFamilyStep2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFamilyStep2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
