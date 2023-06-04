import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksSearchFormComponent } from './components/books-search-form/books-search-form.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRowComponent } from './components/books-row/books-row.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FieldsInterceptor } from './fields.interceptor';
import { BooksService } from './services/books.api.service';



@NgModule({
  declarations: [
    BooksContainerComponent,
    BooksListComponent,
    BooksRowComponent,
    BooksSearchFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    BooksContainerComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: FieldsInterceptor, multi: true
    },
    BooksService
  ]
})
export class BooksModule { }
