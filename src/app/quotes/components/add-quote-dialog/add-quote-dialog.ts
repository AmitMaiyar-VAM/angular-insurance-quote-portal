import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-quote-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatSelectModule],
  templateUrl: './add-quote-dialog.html',
  styleUrl: './add-quote-dialog.css',
})
export class AddQuoteDialog {
  selectedBusiness = '';

  constructor(private dialogRef: MatDialogRef<AddQuoteDialog>) {}

  selectBusiness(business: string): void {
    this.selectedBusiness = business;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  proceed(): void {
    if (!this.selectedBusiness) {
      return;
    }

    this.dialogRef.close(this.selectedBusiness);
  }
}
