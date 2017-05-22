import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerPingStatusComponent } from './docker-ping-status.component';

describe('DockerPingStatusComponent', () => {
  let component: DockerPingStatusComponent;
  let fixture: ComponentFixture<DockerPingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerPingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerPingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
