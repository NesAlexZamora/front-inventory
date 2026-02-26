import { Component, inject, OnInit } from '@angular/core';
import { CategoryS } from '../../../shared/services/category';
import { MaterialModule } from '../../../shared/material-module';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewCategory } from '../new-category/new-category';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  imports: [MaterialModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit{

  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private categoryService = inject(CategoryS); 



  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  

  getCategories(): void{
    this.categoryService.getCategories().subscribe((data:any) => {
      console.log("repuesta categories: ", data);
      this.processCategoriesResponse(data);
    }), (error: any) => {
      console.log("Error: " , error);
    };
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];

    if (resp.metadata[0].code == "00") {
       let listCategory = resp.categoryResponse.category;
       listCategory.forEach((element: CategoryElement) => {
          dataCategory.push(element);
       });

       this.dataSource.data = dataCategory;
    }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategory, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Agregada", "Exito");
        this.getCategories();
      }else if(result == 2){
        this.openSnackBar("Se produjo un error al guardar categoria", "Error");
      }
    });
  }

  openSnackBar(menssage: string, action: string) : MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(menssage, action, {
      duration: 2000
    })
  }
}


export interface CategoryElement{
  descripcion: string;
  id: number;
  name: string;
}
