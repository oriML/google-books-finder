import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.api.service';
import { UntypedFormControl, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BookQuery } from '../../state/query';
import { Observable } from 'rxjs';
import { viewBookModel } from '../../models/books';

@Component({
  selector: 'books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.scss']
})
export class BooksContainerComponent implements OnInit {


  books$: Observable<viewBookModel[]>;
  isBooksLoading$: Observable<boolean>;

  searchQuery: UntypedFormControl = new UntypedFormControl('', Validators.required);
  currentPage: number = 1;
  booksPerPage: number = 10;
  totalItems = 0;

  constructor(
    private readonly booksService: BooksService,
    private readonly bookQuery: BookQuery,
  ) {

    this.books$ = this.bookQuery.selectAll();
    this.isBooksLoading$ = this.bookQuery.select(state => (state.loading)!);
  }

  ngOnInit(): void {
    this.searchQuery.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(x => this.searchBooks())
  }

  searchBooks() {
    if (this.searchQuery.invalid) {
      return;
    }
    const startIndex = (this.currentPage - 1) * this.booksPerPage;
    this.booksService.fetchBooks(this.searchQuery.value, startIndex, this.booksPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.searchBooks();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchBooks();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.booksPerPage);
  }

}
