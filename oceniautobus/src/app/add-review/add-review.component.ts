import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { ReviewsService } from '../services/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  review: any;

  addReviewForm!: FormGroup;
  formSubmitted = false;

  maxRating = 5;
  selectedRating = 1;

  constructor(private reviewsService: ReviewsService, private fb: FormBuilder, private route: Router) { }

  ngOnInit(): void {
    this.addReviewForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(10), this.notOnlySpaces]),
      bus: new FormControl(null, Validators.required),
      stars: [''],
      comment: new FormControl('', [Validators.maxLength(250), this.notOnlySpaces]),
      date: ['']
    });
  }

  notOnlySpaces(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'onlySpaces': true };
    }
    return null;
  }

  onStarClick(rating: number): void {
    if (this.selectedRating === rating) {
      this.addReviewForm.controls['stars'].setValue(rating);
    } else {
      this.selectedRating = rating;
    }
  }

  get starsArray(): number[] {
    return Array(this.maxRating).fill(0).map((_, index) => this.maxRating - index);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async addReview(form: FormGroup) {
    const newReview = {
      name: form.value.name,
      bus: form.value.bus,
      stars: this.selectedRating,
      comment: form.value.comment,
      date: this.formatDate(new Date())
    };
    try {
      this.formSubmitted = true;
      if (this.addReviewForm.valid) {
        const data = await this.reviewsService.addReview(newReview).subscribe(
          (res) => console.log(res),
          (err) => console.log(err),
          () => {
            this.clearFields(this.addReviewForm);
            this.ngOnInit();
          }
        );
      }
      else {
        setTimeout(() => {
          this.formSubmitted = false;
        }, 1500);
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  clearFields(form: FormGroup) {
    form.reset({
      name: "",
      bus: "",
      comment: "",
    });
    this.selectedRating = 0;
    this.formSubmitted = false;
  }

  navigateTo(path: string) {
    this.route.navigate(['/', path]);
  }
}