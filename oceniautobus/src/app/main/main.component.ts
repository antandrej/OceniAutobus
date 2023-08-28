import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../services/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  reviews: any[] = [];

  currComment: string = '';
  currName: string = '';
  currBus: string = '';

  constructor(private reviewsService: ReviewsService, private route: Router) { }

  ngOnInit(): void {
    this.get10Reviews();
  }

  async get10Reviews() {
    try {
      const qurey = await this.reviewsService.get10Reviews().subscribe((data) => {
        this.reviews = data;
      },
        (err) => (console.log(err)));
    } catch (error) {
      console.log(error);
    }
  }

  openComment(comment: string, name: string, bus: string): void {
    document.getElementById('modal')!.style.display = "block";
    this.currComment = comment;
    this.currName = name;
    this.currBus = bus;
  }

  closeComment() {
    document.getElementById('modal')!.style.display = "none";
    this.currComment = '';
    this.currName = '';
    this.currBus = '';
  }

  navigateTo(path: string) {
    this.route.navigate(['/', path]);
  }

}