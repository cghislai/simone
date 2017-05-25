import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueIdComponent } from './unique-id.component';

describe('UniqueIdComponent', () => {
  let component: UniqueIdComponent;
  let fixture: ComponentFixture<UniqueIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
