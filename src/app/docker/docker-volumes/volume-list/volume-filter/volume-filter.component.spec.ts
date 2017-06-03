import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeFilterComponent } from './volume-filter.component';

describe('VolumeFilterComponent', () => {
  let component: VolumeFilterComponent;
  let fixture: ComponentFixture<VolumeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
