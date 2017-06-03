import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRemoveButtonComponent } from './coontainer-remove-button.component';

describe('CoontainerRemoveButtonComponent', () => {
  let component: ContainerRemoveButtonComponent;
  let fixture: ComponentFixture<ContainerRemoveButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerRemoveButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerRemoveButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
