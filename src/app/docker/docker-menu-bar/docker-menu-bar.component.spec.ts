import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DockerMenuBarComponent } from './docker-menu-bar.component';

describe('DockerMenuBarComponent', () => {
  let component: DockerMenuBarComponent;
  let fixture: ComponentFixture<DockerMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DockerMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DockerMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
