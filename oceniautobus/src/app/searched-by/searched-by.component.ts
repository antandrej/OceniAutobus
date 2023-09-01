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

  type: any;
  typeToShow: any;
  by: any;

  listAll: boolean = false;

  constructor(private reviewsService: ReviewsService, private router: Router, private route: ActivatedRoute, private dataService: DataService) 
  {}

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    this.by = this.route.snapshot.paramMap.get('by');

    this.route.params.subscribe(params => {
      this.type = this.route.snapshot.paramMap.get('type');
      this.by = this.route.snapshot.paramMap.get('by');
      if(this.type ===  "bus" || this.type ===  "stars" || this.type ===  "name"){
        this.getReviewsByType();
        this.listAll = false;
      }
      else if(this.type ===  "svi"){
        this.getAllReviews();
        this.listAll = true;
      }
      this.getType(this.type);
    });
  }

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

  async getAllReviews() {
    try {     
      const query = await this.reviewsService.getAllReviews().subscribe((data) => {
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

  getType(type: string) {
    if (type === "bus")
      this.typeToShow = "autobusu broj"
    else if (type === "stars")
      this.typeToShow = "broju zvezdica"
    else if (type === "name")
      this.typeToShow = "imenu"
  }
}
