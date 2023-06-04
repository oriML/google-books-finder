import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'books-search-form',
  templateUrl: './books-search-form.component.html',
  styleUrls: ['./books-search-form.component.scss']
})
export class BooksSearchFormComponent implements OnInit {

  @Input() searchQuery: FormControl = new FormControl('');

  constructor() { }

  ngOnInit(): void {
    this.searchQuery.valueChanges.subscribe(console.log);

  }
}
