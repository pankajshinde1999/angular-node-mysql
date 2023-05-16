import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { MatDialog } from '@angular/material/dialog';
import { CommontableComponent } from '../commontable/commontable.component';
import { UpdateComponent } from '../update/update.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: any = []
  catid: any
  categoriesForm: any
  constructor(private categoryService: ProductService,
    private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.iniliza()
  }
  iniliza() {
    this.categoriesForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    let body = this.categoriesForm.getRawValue()
    console.log(body);
    this.categoryService.addCategory(body).subscribe(
      (data: any) => {
        this.categoriesForm.controls['name'].reset()
        this.getCategories()
        console.log(data)
      }
    )
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
        this.open(data, catid)
      }
    )

  }
  open(data1: any, catid: any) {
    this.dialog.open(CommontableComponent, {
      height: '80%', width: '80%',
      data: {
        value: data1,
        cid: catid
      }
    });
  }
  deleteCategory(did: any) {
    this.categoryService.deleteCategory(did).subscribe(
      data => {
        this.categories = []
        this.getCategories()
      }
    )
  }
  updateg(data: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      height: '80%', width: '80%',
      data: {
        value: data
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      console.log('Returned value:', result);
      this.getCategories()
    });;
  }
}
  // getCategorybyid(){
  //   console.log(this.catid)
  //   this.categoryService.getCategorybyid(this.catid).subscribe(
  //     data => {
  //       this.categories = this.catid
  //       }
  //       )
  // }
