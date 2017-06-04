import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkListPageComponent } from './network-list-page.component';

describe('NetworkListPageComponent', () => {
  let component: NetworkListPageComponent;
  let fixture: ComponentFixture<NetworkListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
