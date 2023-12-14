import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOfficeComponent } from './storage-office.component';

describe('StorageOfficeComponent', () => {
  let component: StorageOfficeComponent;
  let fixture: ComponentFixture<StorageOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageOfficeComponent]
    });
    fixture = TestBed.createComponent(StorageOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
