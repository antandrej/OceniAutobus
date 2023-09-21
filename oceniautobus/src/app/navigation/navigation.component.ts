import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import LinesData from '../../assets/lines.json';
import { Line } from '../models/ILine';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  allLines: Line[] = [];

  isMenuOpen = false;
  busForm!: FormGroup;
  starsForm!: FormGroup;
  nameForm!: FormGroup;

  maxRating = 5;
  selectedRating = 1;

  formSubmitted = false;

  busFormSubmitted = false;
  nameFormSubmitted = false;

  constructor(private route: Router, private dataService: DataService, private fb: FormBuilder) {
    this.allLines = LinesData;
  }

  ngOnInit(): void {
    this.busForm = this.fb.group({
      bus: new FormControl(null, Validators.required)
    });
    this.starsForm = this.fb.group({
      stars: new FormControl(null)
    });
    this.nameForm = this.fb.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(10), this.notOnlySpaces])
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
      this.starsForm.controls['stars'].setValue(rating);
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

  navigateTo(type: string, form: FormGroup) {
    if (form.valid) {
      if (type === 'bus') {
        const by = form.value.bus;
        this.route.navigate(['/pretraga', type, by]);

      }
      else if (type === 'stars') {
        const by = this.selectedRating;
        this.route.navigate(['/pretraga', type, by]);
      }
      else if (type === 'name') {
        const by = form.value.name;
        this.route.navigate(['/pretraga', type, by]);
      }
      else {
        // 404 page
      }
      this.clearFields()
    }
    else {
      if (type === 'bus')
        this.busFormSubmitted = true;
      else if (type === 'name')
        this.nameFormSubmitted = true;
      
        setTimeout(() => {
          this.busFormSubmitted = false;
          this.nameFormSubmitted = false;
        }, 1500);
    }
  }

  navigateToAll(){
    this.route.navigate(['/pretraga', 'svi', 'svi']);
    this.clearFields()
  }

  navigateTo2(path:string) {
    this.route.navigate([path]);
    this.clearFields()
  }

  clearFields(){
    this.toggleMenu();
    this.busForm.reset();
    this.selectedRating = 1;
    this.starsForm.reset();
    this.nameForm.reset();
    this.busFormSubmitted = false;
    this.nameFormSubmitted = false;
  }

}