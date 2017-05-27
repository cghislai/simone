import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerTaskListPageComponent } from './docker-task-list-page.component';

describe('DockerTaskListPageComponent', () => {
  let component: DockerTaskListPageComponent;
  let fixture: ComponentFixture<DockerTaskListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerTaskListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerTaskListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
