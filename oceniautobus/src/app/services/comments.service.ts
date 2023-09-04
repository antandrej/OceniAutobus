import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  addComment(newComment: any): Observable<any> {
    return this.http.post('/api/comments', newComment, { responseType: 'text' });
  }
}