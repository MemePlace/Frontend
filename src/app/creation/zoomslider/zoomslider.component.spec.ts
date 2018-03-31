import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomsliderComponent } from './zoomslider.component';

describe('ZoomsliderComponent', () => {
  let component: ZoomsliderComponent;
  let fixture: ComponentFixture<ZoomsliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomsliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
