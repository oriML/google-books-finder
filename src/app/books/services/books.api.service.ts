import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bookModel, bookResponseModel, viewBookModel } from '../models/books';
import { GoogleBooksService } from './google-books.service';
import { BookStore } from '../state/store';
import { BookQuery } from '../state/query';
import { Injectable } from '@angular/core';
@Injectable()
export class BooksService {

  private readonly BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

  books$: Observable<viewBookModel[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private googleBooksService: GoogleBooksService,
    private booksStore: BookStore,
    private bookQuery: BookQuery
  ) {
    this.books$ = this.bookQuery.selectAll();
    this.isLoading$ = this.bookQuery.select(state => (state.loading)!);
  }

  public getBooksByCriteria(criteria: any): Observable<bookModel[]> {
    return this.http.get<bookModel[]>(this.BASE_URL + criteria);
  }


  fetchBooks(searchQuery: string, startIndex: number, booksPerPage: number) {
    this.booksStore.setLoading(true);
    this.googleBooksService.searchBooks(searchQuery, startIndex, booksPerPage)
      .subscribe({
        next: (response: bookResponseModel) => {
          this.booksStore.set(response.items);
          this.booksStore.setLoading(false);
        },
        error: error => {
          console.log('Error occurred while searching books:', error);
          this.booksStore.setLoading(false);
        }
      }
      );
  }

}