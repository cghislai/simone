import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerStopButtonComponent } from './container-stop-button.component';

describe('ContainerStopButtonComponent', () => {
  let component: ContainerStopButtonComponent;
  let fixture: ComponentFixture<ContainerStopButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerStopButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerStopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
