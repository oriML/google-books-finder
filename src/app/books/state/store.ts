import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { bookModel } from '../models/books';

export interface BookState extends EntityState<bookModel> {
    favorites: bookModel[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'books' })
export class BookStore extends EntityStore<BookState, bookModel> {
    constructor() {
        super();
    }
}
