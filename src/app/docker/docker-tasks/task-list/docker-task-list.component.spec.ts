import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerTaskListComponent } from './docker-task-list.component';

describe('DockerTaskListComponent', () => {
  let component: DockerTaskListComponent;
  let fixture: ComponentFixture<DockerTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
