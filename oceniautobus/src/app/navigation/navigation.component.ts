import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  isMenuOpen = false;
  busForm!: FormGroup;
  starsForm!: FormGroup;
  nameForm!: FormGroup;

  constructor(private route: Router, private dataService: DataService, private fb: FormBuilder) { }

  maxRating = 5;
  selectedRating = 1;

  onStarClick(rating: number): void {
    if (this.selectedRating === rating) {
      this.starsForm.controls['stars'].setValue(rating);
    } else {
      this.selectedRating = rating;
    }
  }

  get starsArray(): number[] {
    return Array(this.maxRating).fill(0).map((_, index) => this.maxRating - index);
  }

  ngOnInit(): void {
    this.busForm = this.fb.group({
      bus: new FormControl(null),
    });
    this.starsForm = this.fb.group({
      stars: new FormControl(null),
    });
    this.nameForm = this.fb.group({
      name: new FormControl(null),
    });
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(type: string, form: FormGroup) {
    if (type === 'bus') {
      const by = form.value.bus;
      this.route.navigate(['/pretraga', type, by]);
    }
    if (type === 'stars') {
      const by = this.selectedRating;
      this.route.navigate(['/pretraga', type, by]);
    }
    if (type === 'name') {
      const by = form.value.name;
      this.route.navigate(['/pretraga', type, by]);
    }
    this.toggleMenu();
  }

  navigateToMain() {
    this.route.navigate(['']);
    this.toggleMenu();
  }
}
