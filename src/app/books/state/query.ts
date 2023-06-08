import { QueryEntity } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { BookState, BookStore } from './store';

@Injectable({ providedIn: 'root' })
export class BookQuery extends QueryEntity<BookState> {
    selectFavorites$ = this.select(state => state.ui.favorites);


    constructor(protected override store: BookStore) {
        super(store);
    }

}
