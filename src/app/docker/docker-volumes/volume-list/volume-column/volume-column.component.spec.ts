import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeColumnComponent } from './volume-column.component';

describe('VolumeColumnComponent', () => {
  let component: VolumeColumnComponent;
  let fixture: ComponentFixture<VolumeColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
