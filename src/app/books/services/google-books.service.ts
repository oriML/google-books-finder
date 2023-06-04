import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { bookModel, bookResponseModel, viewBookModel } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class GoogleBooksService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) { }

  searchBooks(query: string, startIndex: number, maxResults: number): Observable<bookResponseModel> {
    const url = `${this.apiUrl}?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;

    return this.http.get<{ items: bookModel[] }>(url)
      .pipe(
        map(response => ({
          totalItems: response.items.length,
          items: response.items.map(item => this.mapToBook(item))
        }))
      );
  }

  private mapToBook(item: bookModel): viewBookModel {
    return {
      id: item.id,
      title: item.volumeInfo.title,
      description: item.volumeInfo.description,
      image: item.volumeInfo.imageLinks?.thumbnail || ''
    };
  }
}
