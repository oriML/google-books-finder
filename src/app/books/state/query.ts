import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { viewBookModel } from '../models/books';
import { BookState, BookStore } from './store';

@Injectable({ providedIn: 'root' })
export class BookQuery extends QueryEntity<BookState, viewBookModel> {
    constructor(protected override store: BookStore) {
        super(store);
    }
}
