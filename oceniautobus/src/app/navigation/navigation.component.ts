import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AbstractControl, Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isMenuOpen = false;
  busForm!: FormGroup;
  starsForm!: FormGroup;
  nameForm!: FormGroup;

  maxRating = 5;
  selectedRating = 1;

  formSubmitted = false;

  busFormSubmitted = false;
  nameFormSubmitted = false;

  constructor(private route: Router, private dataService: DataService, private fb: FormBuilder) { }

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
      //this.formSubmitted = true;
    }
  }

  navigateToAll(){
    this.route.navigate(['/pretraga', 'svi', 'svi']);
    this.clearFields()
  }

  navigateToMain() {
    this.route.navigate(['']);
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