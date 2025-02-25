import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FamilyMemberPage } from './family-member.page';

describe('FamilyMemberPage', () => {
  let component: FamilyMemberPage;
  let fixture: ComponentFixture<FamilyMemberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
