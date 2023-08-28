import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getReviews(): Observable<any> {
    return this.http.get('/api/reviews');
  }

  addReview(newReview: any): Observable<any> {
    return this.http.post('/api/reviews', newReview, { responseType: 'text' });
  }

}
