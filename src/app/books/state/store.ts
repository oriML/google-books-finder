import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { viewBookModel } from '../models/books';

export interface BookState extends EntityState<viewBookModel> {
    ui: {
        favorites: viewBookModel[],
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'books' })
export class BookStore extends EntityStore<BookState, viewBookModel> {
    constructor() {
        super({
            ui: {
                favorites: []
            }
        });
    }

    updateFavorites(favorites: viewBookModel[]) {
        this.update({
            ui: {
                ...this.ui,
                favorites
            }
        })
    }

}
