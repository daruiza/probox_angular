import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCustomerComponent } from './project-customer.component';

describe('ProjectCustomerComponent', () => {
  let component: ProjectCustomerComponent;
  let fixture: ComponentFixture<ProjectCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectCustomerComponent]
    });
    fixture = TestBed.createComponent(ProjectCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
