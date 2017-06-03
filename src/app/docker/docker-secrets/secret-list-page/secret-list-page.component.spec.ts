import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretListPageComponent } from './secret-list-page.component';

describe('SecretListPageComponent', () => {
  let component: SecretListPageComponent;
  let fixture: ComponentFixture<SecretListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
