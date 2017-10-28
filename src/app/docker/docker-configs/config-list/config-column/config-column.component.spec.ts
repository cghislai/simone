import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigColumnComponent} from './config-column.component';

describe('ConfigColumnComponent', () => {
  let component: ConfigColumnComponent;
  let fixture: ComponentFixture<ConfigColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigColumnComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
