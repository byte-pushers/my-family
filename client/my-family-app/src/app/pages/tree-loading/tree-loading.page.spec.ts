import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeLoadingPage } from './tree-loading.page';

describe('TreeLoadingPage', () => {
  let component: TreeLoadingPage;
  let fixture: ComponentFixture<TreeLoadingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeLoadingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
