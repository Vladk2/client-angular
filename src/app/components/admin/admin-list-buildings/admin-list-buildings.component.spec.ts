import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListBuildingsComponent } from './admin-list-buildings.component';
import { FormsModule }   from '@angular/forms';

describe('AdminListBuildingsComponent', () => {
  let component: AdminListBuildingsComponent;
  let fixture: ComponentFixture<AdminListBuildingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListBuildingsComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
