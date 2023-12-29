/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendingOrderComponent } from './sending-order.component';

describe('SendingOrderComponent', () => {
  let component: SendingOrderComponent;
  let fixture: ComponentFixture<SendingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
