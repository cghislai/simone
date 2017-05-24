import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerServiceListComponent } from './docker-service-list.component';

describe('DockerServiceListComponent', () => {
  let component: DockerServiceListComponent;
  let fixture: ComponentFixture<DockerServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
