import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CategoryS } from '../../../shared/services/category';
import { MaterialModule } from '../../../shared/material-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategory } from '../new-category/new-category';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { Confirm } from '../../../shared/components/confirm/confirm';

@Component({
  selector: 'app-category',
  imports: [MaterialModule,MatPaginator],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  

  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private categoryService = inject(CategoryS);



  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      console.log("repuesta categories: ", data);
      this.processCategoriesResponse(data);
    }), (error: any) => {
      console.log("Error: ", error);
    };
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code == "00") {
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource.data = dataCategory;
      this.dataSource.paginator = this.paginator;
    }
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategory, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Agregada", "Exito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar categoria", "Error");
      }
    });
  }

  openSnackBar(menssage: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(menssage, action, {
      duration: 2000
    })
  }

  edit(id: number, name: string, descripcion: string) {
    const dialogRef = this.dialog.open(NewCategory, {
      data:{id: id, name: name, descripcion: descripcion},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Actualizada", "Exito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar categoria", "Error");
      }
    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(Confirm, {
      data:{id: id},
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Eliminada", "Exito");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar categoria", "Error");
      }
    });
  }

  buscar(termino: string){
    if (termino.length === 0) {
      return this.getCategories();
    }
    this.categoryService.getCategoriesByid(termino).subscribe((resp: any )=> {
      this.processCategoriesResponse(resp);
    })
  }
}



export interface CategoryElement {
  descripcion: string;
  id: number;
  name: string;
}
