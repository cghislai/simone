import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandBoxComponent } from './expand-box.component';

describe('ExpandBoxComponent', () => {
  let component: ExpandBoxComponent;
  let fixture: ComponentFixture<ExpandBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
