import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerRouteComponent } from './docker-route.component';

describe('DockerRouteComponent', () => {
  let component: DockerRouteComponent;
  let fixture: ComponentFixture<DockerRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
