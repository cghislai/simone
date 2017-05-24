import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerImageLabelComponent } from './docker-image-label.component';

describe('DockerImageLabelComponent', () => {
  let component: DockerImageLabelComponent;
  let fixture: ComponentFixture<DockerImageLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerImageLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerImageLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
