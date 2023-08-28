import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from '../services/reviews.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-searched-by',
  templateUrl: './searched-by.component.html',
  styleUrls: ['./searched-by.component.css']
})
export class SearchedByComponent {
  reviews: any[] = [];

  currComment: string = '';
  currName: string = '';
  currBus: string = '';

  constructor(private reviewsService: ReviewsService, private router: Router, private route: ActivatedRoute, private dataService: DataService) 
  {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.by = this.route.snapshot.paramMap.get('by');
    this.getReviewsByType();

    this.route.params.subscribe(params => {
      this.type = this.route.snapshot.paramMap.get('type');
      this.by = this.route.snapshot.paramMap.get('by');
      this.getReviewsByType();
    });
  }

  type: any;
  by: any;

  async getReviewsByType() {
    try {
      
      const query = await this.reviewsService.getReviewsByType(this.type + '/', this.by).subscribe((data) => {
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
    this.router.navigate(['/', path]);
  }
}
