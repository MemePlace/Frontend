import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeCardComponent } from './meme-card.component';

describe('MemeCardComponent', () => {
  let component: MemeCardComponent;
  let fixture: ComponentFixture<MemeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
