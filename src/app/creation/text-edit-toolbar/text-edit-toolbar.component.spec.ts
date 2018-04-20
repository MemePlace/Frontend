import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditToolbarComponent } from './text-edit-toolbar.component';

describe('TextEditToolbarComponent', () => {
  let component: TextEditToolbarComponent;
  let fixture: ComponentFixture<TextEditToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEditToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEditToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
