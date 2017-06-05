import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDetailsPageComponent } from './node-details-page.component';

describe('NodeDetailsPageComponent', () => {
  let component: NodeDetailsPageComponent;
  let fixture: ComponentFixture<NodeDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
