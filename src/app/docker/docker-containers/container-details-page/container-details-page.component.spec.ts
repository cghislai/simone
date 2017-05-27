import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDetailsPageComponent } from './container-details-page.component';

describe('ContainerDetailsPageComponent', () => {
  let component: ContainerDetailsPageComponent;
  let fixture: ComponentFixture<ContainerDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
