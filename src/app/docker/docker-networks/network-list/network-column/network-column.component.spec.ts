import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkColumnComponent } from './network-column.component';

describe('NetworkColumnComponent', () => {
  let component: NetworkColumnComponent;
  let fixture: ComponentFixture<NetworkColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
