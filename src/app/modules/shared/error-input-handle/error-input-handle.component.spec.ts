import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorInputHandleComponent } from './error-input-handle.component';

describe('ErrorInputHandleComponent', () => {
  let component: ErrorInputHandleComponent;
  let fixture: ComponentFixture<ErrorInputHandleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorInputHandleComponent]
    });
    fixture = TestBed.createComponent(ErrorInputHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
