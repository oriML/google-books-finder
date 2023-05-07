import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, scan } from 'rxjs';
import { bookModel } from './models/books';

@Injectable()
export class FieldsInterceptorInterceptor implements HttpInterceptor {

  private readonly FIELDS_URL = "&fields=items(id, volumeInfo, searchInfo)";

  constructor() { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req.clone({
      url: req.url + this.FIELDS_URL
    }));
  }
}
