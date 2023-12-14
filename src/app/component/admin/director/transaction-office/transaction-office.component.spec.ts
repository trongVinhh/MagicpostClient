import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionOfficeComponent } from './transaction-office.component';

describe('TransactionOfficeComponent', () => {
  let component: TransactionOfficeComponent;
  let fixture: ComponentFixture<TransactionOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionOfficeComponent]
    });
    fixture = TestBed.createComponent(TransactionOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
