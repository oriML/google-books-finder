import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bookModel } from '../models/books';

export class BooksService {

  private readonly BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getBooksByCriteria(criteria: any): Observable<bookModel[]> {
    return this.http.get<bookModel[]>(this.BASE_URL + criteria);
  }
}
