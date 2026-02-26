import { Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MaterialModule } from "../../../shared/material-module";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { CategoryS } from '../../../shared/services/category';

@Component({
  selector: 'app-new-category',
  imports: [MatDialogModule, MaterialModule, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './new-category.html',
  styleUrl: './new-category.css',
})
export class NewCategory implements OnInit {

  public categoryForm!: FormGroup;
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryS);
  private dialogRef = inject(MatDialogRef);


  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  onSave() {

    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const data = this.categoryForm.value;

    this.categoryService.saveCategories(data).subscribe({
      next: (response) => {
        console.log('Guardado correctamente', response);
        this.dialogRef.close(1); // éxito
      },
      error: (error) => {
        console.error('Error al guardar', error);
        this.dialogRef.close(2); // error
      }
    });

  }


}
