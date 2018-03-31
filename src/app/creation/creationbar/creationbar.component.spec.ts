import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationbarComponent } from './creationbar.component';

describe('CreationbarComponent', () => {
  let component: CreationbarComponent;
  let fixture: ComponentFixture<CreationbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
