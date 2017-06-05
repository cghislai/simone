import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeColumnComponent } from './node-column.component';

describe('NodeColumnComponent', () => {
  let component: NodeColumnComponent;
  let fixture: ComponentFixture<NodeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
