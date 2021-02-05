import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RecommendationRequest } from 'src/app/common/RecommendationRequest';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.sass']
})
export class RecommendationComponent implements OnInit {
  confirmationMessage = '';
  feedbackFormGroup: FormGroup = this.formBuilder.group({
    subject: [''],
    fullText: ['']
  });

  constructor(private formBuilder: FormBuilder,
              private feedbackService: FeedbackService,
              private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.feedbackFormGroup !== null) {
      const subjectInput = this.feedbackFormGroup.get('subject');
      const fullTextInput = this.feedbackFormGroup.get('fullText');
      const subject = subjectInput?.value;
      const fullText = fullTextInput?.value;
      const request = new RecommendationRequest(subject, fullText);
      if (subject !== null && subject !== undefined && typeof subject === 'string'
      && fullText !== null && fullText !== undefined && typeof fullText === 'string') {
        this.feedbackService.sendFeedback(request).subscribe(
          result => {this.confirmationMessage = result.message; }
        );
        this.router.navigate(['/recommendThankYou']);
      }
    }
  }
}
