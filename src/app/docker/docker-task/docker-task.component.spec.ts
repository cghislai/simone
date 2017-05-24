import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerTaskComponent } from './docker-task.component';

describe('DockerTaskComponent', () => {
  let component: DockerTaskComponent;
  let fixture: ComponentFixture<DockerTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
