import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerStatusIconComponent } from './container-status-icon.component';

describe('ContainerStatusIconComponent', () => {
  let component: ContainerStatusIconComponent;
  let fixture: ComponentFixture<ContainerStatusIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerStatusIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
