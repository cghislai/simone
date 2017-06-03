import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortMappingsComponent } from './port-mappings.component';

describe('PortMappingsComponent', () => {
  let component: PortMappingsComponent;
  let fixture: ComponentFixture<PortMappingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortMappingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
