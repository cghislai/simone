import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSpecComponent } from './container-spec.component';

describe('ContainerSpecComponent', () => {
  let component: ContainerSpecComponent;
  let fixture: ComponentFixture<ContainerSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
