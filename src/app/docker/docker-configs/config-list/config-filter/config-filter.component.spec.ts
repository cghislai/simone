import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigFilterComponent} from './config-filter.component';

describe('ConfigFilterComponent', () => {
  let component: ConfigFilterComponent;
  let fixture: ComponentFixture<ConfigFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigFilterComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
