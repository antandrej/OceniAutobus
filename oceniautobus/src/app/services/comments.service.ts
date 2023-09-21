import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'https://oceniautobusapi.onrender.com';

  constructor(private http: HttpClient) { }

  addComment(newComment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/comments`, newComment, { responseType: 'text' });
  }
}