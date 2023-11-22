import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTransactionComponent } from './manager-transaction.component';

describe('ManagerTransactionComponent', () => {
  let component: ManagerTransactionComponent;
  let fixture: ComponentFixture<ManagerTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerTransactionComponent]
    });
    fixture = TestBed.createComponent(ManagerTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
