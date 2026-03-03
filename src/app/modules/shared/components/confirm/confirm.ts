import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from '../../material-module';
import { Category } from '../../../category/components/category/category';
import { CategoryS } from '../../services/category';

@Component({
  selector: 'app-confirm',
  imports: [MatDialogModule,MaterialModule],
  templateUrl: './confirm.html',
  styleUrl: './confirm.css',
})
export class Confirm implements OnInit{

  private categoryService = inject(CategoryS);
  private dialogRef = inject(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
   
  }

  onNoClick(){
    this.dialogRef.close(3);
  }

  delete(){
    if (this.data != null) {
      this.categoryService.deleteCategories(this.data.id).subscribe ((data:any) => {
        this.dialogRef.close(1);
      },(error: any) => {
        this.dialogRef.close(2);
      })
    }else{
      this.dialogRef.close(2);
    }
  }

}
