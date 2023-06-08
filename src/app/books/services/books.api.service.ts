import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, combineLatest, map, take } from 'rxjs';
import { bookModel, bookResponseModel, viewBookModel } from '../models/books';
import { GoogleBooksService } from './google-books.service';
import { BookStore } from '../state/store';
import { BookQuery } from '../state/query';
import { Injectable, OnDestroy } from '@angular/core';
@Injectable()
export class BooksService implements OnDestroy {

  private readonly BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

  books$: Observable<viewBookModel[]>;
  isLoading$: Observable<boolean>;
  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private googleBooksService: GoogleBooksService,
    private booksStore: BookStore,
    private bookQuery: BookQuery
  ) {
    this.books$ = this.bookQuery.selectAll();
    this.isLoading$ = this.bookQuery.select(state => (state.loading)!);
    this.subscription = new Subscription();
    this.subscription.add(() => this.isLoading$);
    this.subscription.add(() => this.books$);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public getBooksByCriteria(criteria: any): Observable<bookModel[]> {
    return this.http.get<bookModel[]>(this.BASE_URL + criteria);
  }

  fetchBooks(searchQuery: string, startIndex: number, booksPerPage: number) {
    this.booksStore.setLoading(true);
    this.subscription.add(
      combineLatest([
        this.googleBooksService.searchBooks(searchQuery, startIndex, booksPerPage),
        this.bookQuery.selectFavorites$
      ])
        .pipe(
          map(([bookResponse, favorites]) => {
            return {
              ...bookResponse,
              items: bookResponse.items.map((book) => ({
                ...book,
                isFavorite: favorites.some(f => f.id === book.id),
              }))
            }
          })
        ).subscribe({
          next: (response: bookResponseModel) => {
            this.booksStore.set(response.items);
            this.booksStore.setLoading(false);
          },
          error: error => {
            console.log('Error occurred while searching books:', error);
            this.booksStore.setLoading(false);
          }
        })
    );
  };

  addToFavorites(book: viewBookModel) {
    if (book) {
      this.bookQuery.selectFavorites$
        .pipe(take(1))
        .subscribe(
          (favorites) => {
            if (favorites.findIndex(f => f.id === book.id) === -1) {
              this.booksStore.updateFavorites([...favorites, book]);
            }
          });
    }
  }

}