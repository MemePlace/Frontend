import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionBarComponent } from './function-bar.component';

describe('FunctionBarComponent', () => {
  let component: FunctionBarComponent;
  let fixture: ComponentFixture<FunctionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
