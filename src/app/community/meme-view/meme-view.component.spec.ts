import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeViewComponent } from './meme-view.component';

describe('MemeViewComponent', () => {
  let component: MemeViewComponent;
  let fixture: ComponentFixture<MemeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
