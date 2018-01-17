import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListBuildingsComponent } from './admin-list-buildings.component';

describe('AdminListBuildingsComponent', () => {
  let component: AdminListBuildingsComponent;
  let fixture: ComponentFixture<AdminListBuildingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListBuildingsComponent ]
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
