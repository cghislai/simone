import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretColumnComponent } from './secret-column.component';

describe('SecretColumnComponent', () => {
  let component: SecretColumnComponent;
  let fixture: ComponentFixture<SecretColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
