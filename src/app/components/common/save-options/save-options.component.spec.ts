import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOptionsComponent } from './save-options.component';

describe('SaveOptionsComponent', () => {
  let component: SaveOptionsComponent;
  let fixture: ComponentFixture<SaveOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
