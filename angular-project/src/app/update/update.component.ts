import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  products: any = []
  ProductFrom: any;
  categories: any = []
  categoriesFrom: any;
  bat: boolean
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private pservice: ProductService,
    private router: Router) {
    if (data['title'] == 'Product') {
      this.products = data['value'];
      console.log('products', this.products)
      this.iniliza()
      this.bat = true
      console.log(this.categories)
    } else {
      this.categories = data['value']
      console.log('categories', this.categories)
      this.bat = false
      this.inilizac()
    }
  }
  iniliza() {
    this.ProductFrom = this.formBuilder.group({
      name: ['', Validators.required],
      pid: ['', Validators.required],
      cid: ['', Validators.required]
    });
  }
  inilizac() {
    this.categoriesFrom = this.formBuilder.group({
      name: ['', Validators.required],
      cid: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if (Object.keys(this.products).length > 0) {
      this.ProductFrom.patchValue({
        name: this.products.ProductName,
        pid: this.products.ProductID,
        cid: this.products.CategoryID
      })
      this.ProductFrom.get('pid')?.disable();
      this.ProductFrom.get('cid')?.disable();
    } else {
      this.categoriesFrom.patchValue({
        name: this.categories.CategoryName,
        cid: this.categories.CategoryID
      })
      this.categoriesFrom.get('cid')?.disable();
    }
  }
  onSubmit() {
    if (this.bat == true) {
      let body = this.ProductFrom.getRawValue()
      // body.cid = this.data['cid']
      console.log(body);
      this.pservice.updatep(body).subscribe(
        (data: any) => {
          // this.router.navigate(['/home/products'])
          console.log(data)
        }
      )
    }
    else {
      let body = this.categoriesFrom.getRawValue()
      this.pservice.updatecat(body).subscribe(
        (data: any) => {
          // this.router.navigate(['/home/products'])
          console.log(data)
        })
    }
  }
}
