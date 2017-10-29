import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemComponent } from './project-item.component';
import { Component } from '@angular/core';

@Component({
  template: `<is-project-item [project]="project"></is-project-item>`,
})
class ParentProjectItemComponent {
  public project = {
    avatarUrls: {},
  };
}

describe('ProjectItemComponent', () => {
  let component: ParentProjectItemComponent;
  let fixture: ComponentFixture<ParentProjectItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentProjectItemComponent, ProjectItemComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
