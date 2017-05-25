import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerServiceColumnComponent } from './docker-service-column.component';

describe('DockerServiceColumnComponent', () => {
  let component: DockerServiceColumnComponent;
  let fixture: ComponentFixture<DockerServiceColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerServiceColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerServiceColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
