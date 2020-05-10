import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedCustomizationComponent } from './advanced-customization.component';

describe('AdvancedCustomizationComponent', () => {
  let component: AdvancedCustomizationComponent;
  let fixture: ComponentFixture<AdvancedCustomizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedCustomizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
