import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isMenuOpen = false;
  searchForm!: FormGroup;

  constructor(private route: Router, private dataService: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      bus: new FormControl(null),
      stars: new FormControl(null),
      name: new FormControl(null)
    });
  }

  maxRating = 5;
  selectedRating = 1;

  onStarClick(rating: number): void {
    if (this.selectedRating === rating) {
      this.searchForm.controls['stars'].setValue(rating);
    } else {
      this.selectedRating = rating;
    }
  }

  get starsArray(): number[] {
    return Array(this.maxRating).fill(0).map((_, index) => this.maxRating - index);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(type: string) {
    if (type === 'bus') {
      const by = this.searchForm.value.bus;
      this.route.navigate(['/pretraga', type, by]);
    }
    else if (type === 'stars') {
      const by = this.selectedRating;
      this.route.navigate(['/pretraga', type, by]);
    }
    else if (type === 'name') {
      const by = this.searchForm.value.name;
      this.route.navigate(['/pretraga', type, by]);
    }
    else if (type === 'svi') {
      const by = "svi";
      this.route.navigate(['/pretraga', type, by]);
    }
    else {
      // 404 page
    }
    this.toggleMenu();
    this.clearFields(this.searchForm);
  }

  navigateToMain() {
    this.route.navigate(['']);
    this.toggleMenu();
    this.clearFields(this.searchForm);
  }

  clearFields(form: FormGroup) {
    form.reset({
      name: "",
      bus: "",
    });
    this.selectedRating = 1;
  }
}