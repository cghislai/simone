import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeDetailsPageComponent } from './volume-details-page.component';

describe('VolumeDetailsPageComponent', () => {
  let component: VolumeDetailsPageComponent;
  let fixture: ComponentFixture<VolumeDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
