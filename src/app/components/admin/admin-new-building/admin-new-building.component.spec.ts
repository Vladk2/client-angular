import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewBuildingComponent } from './admin-new-building.component';

describe('AdminNewBuildingComponent', () => {
  let component: AdminNewBuildingComponent;
  let fixture: ComponentFixture<AdminNewBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
