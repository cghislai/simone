import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerServiceComponent } from './docker-service.component';

describe('DockerServiceComponent', () => {
  let component: DockerServiceComponent;
  let fixture: ComponentFixture<DockerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
