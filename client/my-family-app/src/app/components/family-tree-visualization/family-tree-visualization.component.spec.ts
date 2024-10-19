import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamilyTreeVisualizationComponent } from './family-tree-visualization.component';

describe('FamilyTreeVisualizationComponent', () => {
  let component: FamilyTreeVisualizationComponent;
  let fixture: ComponentFixture<FamilyTreeVisualizationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyTreeVisualizationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyTreeVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
