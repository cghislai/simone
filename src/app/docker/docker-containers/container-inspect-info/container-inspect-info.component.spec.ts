import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInspectInfoComponent } from './container-inspect-info.component';

describe('ContainerInspectInfoComponent', () => {
  let component: ContainerInspectInfoComponent;
  let fixture: ComponentFixture<ContainerInspectInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerInspectInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerInspectInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
