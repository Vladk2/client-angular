import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListFirmsComponent } from './admin-list-firms.component';
import { FormsModule }   from '@angular/forms';

describe('AdminListFirmsComponent', () => {
  let component: AdminListFirmsComponent;
  let fixture: ComponentFixture<AdminListFirmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListFirmsComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
