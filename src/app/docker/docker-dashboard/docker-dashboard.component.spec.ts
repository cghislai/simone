import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerDashboardComponent } from './docker-dashboard.component';

describe('DockerDashboardComponent', () => {
  let component: DockerDashboardComponent;
  let fixture: ComponentFixture<DockerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
