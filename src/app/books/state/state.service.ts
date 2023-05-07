import { Injectable } from '@angular/core';
import { BooksService } from '../services/books.api.service';
import { BookStore } from './store';
import { tap } from 'rxjs/operators';
import { bookModel } from '../models/books';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookStateService {

    constructor(
        private readonly api: BooksService,
        private readonly store: BookStore,
    ) { }

    public getBooksByCriteria(criteria: any): Observable<bookModel[]> {
        return this.api.getBooksByCriteria(criteria)
            .pipe(
                tap((entities) => this.store.upsertMany(entities))
            );
    }

}
