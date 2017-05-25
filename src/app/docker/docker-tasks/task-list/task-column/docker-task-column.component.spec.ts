import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerTaskColumnComponent } from './docker-task-column.component';

describe('DockerTaskColumnComponent', () => {
  let component: DockerTaskColumnComponent;
  let fixture: ComponentFixture<DockerTaskColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerTaskColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerTaskColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
