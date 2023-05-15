import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { CommontableComponent } from '../commontable/commontable.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any = []
  catid: any
  constructor(private categoryService: ProductService, private dialog: MatDialog) {
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
      }
    )
  }
  openDilog(catid: any) {
    console.log(catid)
    this.categoryService.getCategorybyid(catid).subscribe(
      data => {
        console.log(data)
        this.open(data)
      }
    )

  }
  open(data1: any) {
    this.dialog.open(CommontableComponent, {
      height: '80%', width: '80%',
      data: {
        value: data1

      }
    });
  }
  deleteCategory(did: any) {
    this.categoryService.deleteCategory(did).subscribe(
      data => {
        // console.log(data)
        this.categories = []
        this.getCategories()
      }
    )
  }
  // getCategorybyid(){
  //   console.log(this.catid)
  //   this.categoryService.getCategorybyid(this.catid).subscribe(
  //     data => {
  //       this.categories = this.catid
  //       }
  //       )
  // }
}