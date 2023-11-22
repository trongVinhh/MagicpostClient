import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStorageComponent } from './employee-storage.component';

describe('EmployeeStorageComponent', () => {
  let component: EmployeeStorageComponent;
  let fixture: ComponentFixture<EmployeeStorageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeStorageComponent]
    });
    fixture = TestBed.createComponent(EmployeeStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
