import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<any> {
    return this.http.get('/api/reviews');
  }

  getReviewsByType(type: any, by:any): Observable<any> {
    return this.http.get('/api/pretraga/' + type + by,{responseType: 'json'});
  }

  get10Reviews(): Observable<any> {
    return this.http.get('/api/reviews10');
  }

  addReview(newReview: any): Observable<any> {
    return this.http.post('/api/reviews', newReview, { responseType: 'text' });
  }

}
