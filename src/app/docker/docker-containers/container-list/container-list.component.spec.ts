import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerListComponent } from './container-list.component';

describe('ContainerListComponent', () => {
  let component: ContainerListComponent;
  let fixture: ComponentFixture<ContainerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
