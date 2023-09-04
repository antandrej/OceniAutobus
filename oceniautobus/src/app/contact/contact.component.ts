import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  addCommentForm!: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private commentsService: CommentsService, private route: Router) { }

  ngOnInit(): void {
    this.addCommentForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      comment: new FormControl('', [Validators.required, Validators.maxLength(250), this.notOnlySpaces]),
    });
  }

  notOnlySpaces(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.trim().length === 0) {
      return { 'onlySpaces': true };
    }
    return null;
  }

  async addComment(form: FormGroup) {
    const newComment = {
      email: form.value.email,
      comment: form.value.comment,
      date: this.formatDate(new Date())
    };
    try {
      this.formSubmitted = true;
      if (this.addCommentForm.valid) {
        const data = await this.commentsService.addComment(newComment).subscribe(
          (res) => console.log(res),
          (err) => console.log(err),
          () => {
            this.clearFields(this.addCommentForm);
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
      email: "",
      comment: "",
    });
    this.formSubmitted = false;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  navigateTo(path: string) {
    this.route.navigate(['/', path]);
  }
}