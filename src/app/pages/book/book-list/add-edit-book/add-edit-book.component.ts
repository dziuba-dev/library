import {Component, Inject, Optional} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../../core/services/book.service";
import {Book} from "../../../../core/models/book";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'lib-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.scss']
})
export class AddEditBookComponent {
  isEditMode = false;
  addBookForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    isAvailable: new FormControl()
  });

  constructor(
    private _bookService: BookService,
    private dialogRef: MatDialogRef<AddEditBookComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data?: Book) {
    if (this.data) {
      this.isEditMode = true;
      this.addBookForm.patchValue(this.data);
    }
  }

  addBook() {
    const book = {
      id: this.generateGUID(),
      name: this.addBookForm.controls['name'].value,
      author: this.addBookForm.controls['author'].value,
      category: this.addBookForm.controls['category'].value,
      isAvailable: this.addBookForm.controls['isAvailable'].value ?? false
    } as Book;

    this._bookService.addBook(book);
    this.dialogRef.close();
  }

  editBook() {
    const book = { ...this.data, ...this.addBookForm.value } as Book;
    this._bookService.editBook(book);
    this.dialogRef.close();
  }

  generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
