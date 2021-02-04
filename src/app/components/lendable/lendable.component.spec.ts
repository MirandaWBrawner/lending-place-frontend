import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendableComponent } from './lendable.component';

describe('LendableComponent', () => {
  let component: LendableComponent;
  let fixture: ComponentFixture<LendableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LendableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
