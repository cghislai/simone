import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigListPageComponent} from './config-list-page.component';

describe('ConfigListPageComponent', () => {
  let component: ConfigListPageComponent;
  let fixture: ComponentFixture<ConfigListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigListPageComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
