import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRestartButtonComponent } from './container-restart-button.component';

describe('ContainerRestartButtonComponent', () => {
  let component: ContainerRestartButtonComponent;
  let fixture: ComponentFixture<ContainerRestartButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerRestartButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerRestartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
