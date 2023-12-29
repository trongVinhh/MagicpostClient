/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StorageDeliveryFormComponent } from './storage-delivery-form.component';

describe('StorageDeliveryFormComponent', () => {
  let component: StorageDeliveryFormComponent;
  let fixture: ComponentFixture<StorageDeliveryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageDeliveryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageDeliveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
