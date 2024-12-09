import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AddToFamilyPage} from './add-to-family.page';

describe('AddToFamilyPage', () => {
  let component: AddToFamilyPage;
  let fixture: ComponentFixture<AddToFamilyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToFamilyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
