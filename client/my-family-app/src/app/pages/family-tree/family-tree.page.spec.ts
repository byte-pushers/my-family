import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamilyTreePage } from './family-tree.page';

describe('FamilyTreePage', () => {
  let component: FamilyTreePage;
  let fixture: ComponentFixture<FamilyTreePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
