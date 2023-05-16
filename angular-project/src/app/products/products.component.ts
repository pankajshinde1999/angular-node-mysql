import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { UpdateComponent } from '../update/update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = []
  constructor(private productService: ProductService, private dialog: MatDialog) {
  }
  getProducts() {
    this.productService.getProductss().subscribe(
      data => {
        this.products = data
      })
  }
  updatep(data: any) {
    const dialogRef = this.dialog.open(UpdateComponent, {
      height: '80%', width: '80%',
      data: {
        value: data,
        title: 'Product'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      console.log('Returned value:', result);
      this.getProducts()
      // Perform actions with the returned value
    });;
  }
  deleteproduct(did: any) {
    //console.log(did)
    this.productService.deleteproduct(did).subscribe(
      data => {
        this.products = []
        this.getProducts()
      }
    )
  }
  // joinproductsbyid(){
  //   this.productService.getProductbyid(this.products.id).subscribe(
  //     (data:any) => { this.products.id = data})
  // }

}