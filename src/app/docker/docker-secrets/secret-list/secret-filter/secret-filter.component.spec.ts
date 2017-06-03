import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretFilterComponent } from './secret-filter.component';

describe('SecretFilterComponent', () => {
  let component: SecretFilterComponent;
  let fixture: ComponentFixture<SecretFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
