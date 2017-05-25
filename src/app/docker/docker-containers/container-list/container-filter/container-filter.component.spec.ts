import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFilterComponent } from './container-filter.component';

describe('ContainerFilterComponent', () => {
  let component: ContainerFilterComponent;
  let fixture: ComponentFixture<ContainerFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
