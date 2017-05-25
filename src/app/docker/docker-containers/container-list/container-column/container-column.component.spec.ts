import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerColumnComponent } from './container-column.component';

describe('ContainerColumnComponent', () => {
  let component: ContainerColumnComponent;
  let fixture: ComponentFixture<ContainerColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
