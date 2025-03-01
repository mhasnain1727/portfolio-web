import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDescriptionDialogComponent } from './project-description-dialog.component';

describe('ProjectDescriptionDialogComponent', () => {
  let component: ProjectDescriptionDialogComponent;
  let fixture: ComponentFixture<ProjectDescriptionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDescriptionDialogComponent]
    });
    fixture = TestBed.createComponent(ProjectDescriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
