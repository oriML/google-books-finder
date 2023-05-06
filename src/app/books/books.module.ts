import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksSearchFormComponent } from './components/books-search-form/books-search-form.component';
import { BooksContainerComponent } from './components/books-container/books-container.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksRowComponent } from './components/books-row/books-row.component';



@NgModule({
  declarations: [
    BooksSearchFormComponent,
    BooksContainerComponent,
    BooksListComponent,
    BooksRowComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BooksModule { }
