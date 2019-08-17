import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkbenchTableComponent } from './workbench-table.component';

describe('WorkbenchTableComponent', () => {
  let component: WorkbenchTableComponent;
  let fixture: ComponentFixture<WorkbenchTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkbenchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkbenchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
