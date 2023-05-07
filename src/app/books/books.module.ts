import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksSearchFormComponent } from './components/books-search-form/books-search-form.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRowComponent } from './components/books-row/books-row.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FieldsInterceptorInterceptor } from './fields-interceptor.interceptor';



@NgModule({
  declarations: [
    BooksSearchFormComponent,
    BooksContainerComponent,
    BooksListComponent,
    BooksRowComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: FieldsInterceptorInterceptor, multi: true
    }
  ]
})
export class BooksModule { }
