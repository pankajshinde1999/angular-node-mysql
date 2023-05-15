import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any = []
  catid: any
  constructor(private categoryService: ProductService) {
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data
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