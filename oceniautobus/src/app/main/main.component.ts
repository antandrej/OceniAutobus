import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  reviews: any[] = [];

  review: any;

  addReviewForm!: FormGroup;

  constructor(private reviewsService: ReviewsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getReviews();
    this.addReviewForm = this.fb.group({
      name: ['', Validators.required],
      bus: ['', Validators.required],
      stars: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['']
    });
  }

  async getReviews() {
    try {
      const qurey = await this.reviewsService.getReviews().subscribe((data) => {
        this.reviews = data;
      },
        (err) => (console.log(err)));
    } catch (error) {
      console.log(error);
    }
  }

  ///////////////////////////////////////////

  maxRating = 5;
  selectedRating = 0;

  onStarClick(rating: number): void {
    if (this.selectedRating === rating) {
      // If the same star is clicked, reset the selection
      this.selectedRating = 0;
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
      const data = await this.reviewsService.addReview(newReview).subscribe(
        (res) => console.log(res),
        (err) => console.log(err),
        () => {
          this.clearFields(this.addReviewForm);
          this.ngOnInit();
        }
      );
    }
  catch(error) {
    console.log(error);
  }
}

  openForm() {
    document.getElementById("form")!.style.display = "flex";
    this.clearFields(this.addReviewForm);
  }

  closeForm() {
    document.getElementById("form")!.style.display = "none";
    this.clearFields(this.addReviewForm);
  }

  clearFields(form: FormGroup) {
    form.value.name = "";
    form.value.bus = "";
    this.selectedRating = 0;
    form.value.comment = "";
  }

}