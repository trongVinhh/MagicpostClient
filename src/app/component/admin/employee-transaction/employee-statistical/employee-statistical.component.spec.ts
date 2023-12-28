import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStatisticalComponent } from './employee-statistical.component';

describe('EmployeeStatisticalComponent', () => {
  let component: EmployeeStatisticalComponent;
  let fixture: ComponentFixture<EmployeeStatisticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeStatisticalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeStatisticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
