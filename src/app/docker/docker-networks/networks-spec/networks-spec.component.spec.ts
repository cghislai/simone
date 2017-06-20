import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworksSpecComponent } from './networks-spec.component';

describe('NetworksSpecComponent', () => {
  let component: NetworksSpecComponent;
  let fixture: ComponentFixture<NetworksSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworksSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworksSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
