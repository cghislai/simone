import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeListPageComponent } from './volume-list-page.component';

describe('VolumeListPageComponent', () => {
  let component: VolumeListPageComponent;
  let fixture: ComponentFixture<VolumeListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
