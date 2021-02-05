import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationThankYouComponent } from './recommendation-thank-you.component';

describe('RecommendationThankYouComponent', () => {
  let component: RecommendationThankYouComponent;
  let fixture: ComponentFixture<RecommendationThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationThankYouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
