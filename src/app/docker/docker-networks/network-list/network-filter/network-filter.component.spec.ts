import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkFilterComponent } from './network-filter.component';

describe('NetworkFilterComponent', () => {
  let component: NetworkFilterComponent;
  let fixture: ComponentFixture<NetworkFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
