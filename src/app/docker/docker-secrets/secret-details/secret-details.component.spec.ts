import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretDetailsComponent } from './secret-details.component';

describe('SecretDetailsComponent', () => {
  let component: SecretDetailsComponent;
  let fixture: ComponentFixture<SecretDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
