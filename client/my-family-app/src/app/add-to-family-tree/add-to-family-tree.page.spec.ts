import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToFamilyTreePage } from './add-to-family-tree.page';

describe('AddToFamilyTreePage', () => {
  let component: AddToFamilyTreePage;
  let fixture: ComponentFixture<AddToFamilyTreePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFamilyTreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
