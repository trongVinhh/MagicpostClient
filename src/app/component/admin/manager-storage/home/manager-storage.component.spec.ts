import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStorageComponent } from './manager-storage.component';

describe('ManagerStorageComponent', () => {
  let component: ManagerStorageComponent;
  let fixture: ComponentFixture<ManagerStorageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerStorageComponent]
    });
    fixture = TestBed.createComponent(ManagerStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
