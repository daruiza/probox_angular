import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectColaboratorComponent } from './project-colaborator.component';

describe('ProjectColaboratorComponent', () => {
  let component: ProjectColaboratorComponent;
  let fixture: ComponentFixture<ProjectColaboratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectColaboratorComponent]
    });
    fixture = TestBed.createComponent(ProjectColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
