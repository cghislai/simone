import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretDetailsPageComponent } from './secret-details-page.component';

describe('SecretDetailsPageComponent', () => {
  let component: SecretDetailsPageComponent;
  let fixture: ComponentFixture<SecretDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
