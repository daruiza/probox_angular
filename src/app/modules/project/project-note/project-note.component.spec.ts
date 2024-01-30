import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNoteComponent } from './project-note.component';

describe('ProjectNoteComponent', () => {
  let component: ProjectNoteComponent;
  let fixture: ComponentFixture<ProjectNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectNoteComponent]
    });
    fixture = TestBed.createComponent(ProjectNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
