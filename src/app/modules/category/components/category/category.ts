import { Component, inject, OnInit } from '@angular/core';
import { CategoryS } from '../../../shared/services/category';
import { MaterialModule } from '../../../shared/material-module';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category',
  imports: [MaterialModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit{

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  private categoryService = inject(CategoryS);

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
}

export interface CategoryElement{
  descripcion: string;
  id: number;
  name: string;
}
