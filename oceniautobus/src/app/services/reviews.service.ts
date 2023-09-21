import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private baseUrl = 'https://oceniautobusapi.onrender.com';

  constructor(private http: HttpClient) {}

  getAllReviews(): Observable<any> {
    const url = `${this.baseUrl}/api/reviews`;
    return this.http.get(url);
  }

  getReviewsByType(type: any, by: any): Observable<any> {
    const url = `${this.baseUrl}/api/pretraga/${type}${by}`;
    return this.http.get(url);
  }

  get10Reviews(): Observable<any> {
    const url = `${this.baseUrl}/api/reviews10`;
    return this.http.get(url);
  }

  addReview(newReview: any): Observable<any> {
    const url = `${this.baseUrl}/api/reviews`;
    return this.http.post(url, newReview, { responseType: 'text' });
  }

}
