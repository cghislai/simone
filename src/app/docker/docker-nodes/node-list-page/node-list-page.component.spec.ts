import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeListPageComponent } from './node-list-page.component';

describe('NodeListPageComponent', () => {
  let component: NodeListPageComponent;
  let fixture: ComponentFixture<NodeListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
