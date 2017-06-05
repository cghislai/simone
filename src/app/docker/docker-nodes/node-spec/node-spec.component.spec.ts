import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSpecComponent } from './node-spec.component';

describe('NodeSpecComponent', () => {
  let component: NodeSpecComponent;
  let fixture: ComponentFixture<NodeSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
