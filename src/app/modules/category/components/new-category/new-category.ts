import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
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
  private data = inject(MAT_DIALOG_DATA);
  estadoFormulario: string = "";


  ngOnInit(): void {
    this.estadoFormulario = "Agregar"
    console.log(this.data);
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar"
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  onSave() {
    const data = this.categoryForm.value;
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    if (this.data != null) {
      //update
      this.categoryService.updateCategories(data,this.data.id).subscribe({
        next: (response) => {
          console.log('Actualizar correctamente', response);
          this.dialogRef.close(1); // éxito
        },
        error: (error) => {
          console.error('Error al actualizar', error);
          this.dialogRef.close(2); // error
        }
      });

    } else {
      //create
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

  updateForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      descripcion: [data.descripcion, Validators.required]
    });
  }



}
