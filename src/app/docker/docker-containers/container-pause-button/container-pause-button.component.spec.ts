import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPauseButtonComponent } from './container-pause-button.component';

describe('ContainerPauseButtonComponent', () => {
  let component: ContainerPauseButtonComponent;
  let fixture: ComponentFixture<ContainerPauseButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerPauseButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerPauseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
