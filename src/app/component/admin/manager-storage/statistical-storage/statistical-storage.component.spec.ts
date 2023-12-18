import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalStorageComponent } from './statistical-storage.component';

describe('StatisticalStorageComponent', () => {
  let component: StatisticalStorageComponent;
  let fixture: ComponentFixture<StatisticalStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalStorageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisticalStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
