import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';


@Component({
  selector: 'app-commontable',
  templateUrl: './commontable.component.html',
  styleUrls: ['./commontable.component.css']
})
export class CommontableComponent {
  products: any;
  ProductFrom: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private pservice: ProductService,
    private router: Router) {
    this.products = data['value'];
    console.log('products', this.products)
    this.iniliza()
  }
  iniliza() {
    this.ProductFrom = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit() {
    let body = this.ProductFrom.getRawValue()
    body.cid = this.data['cid']
    console.log(body);
    this.pservice.addProduct(body).subscribe(
      (data: any) => {
        this.router.navigate(['/home/products'])
      }
    )
  }
  // this.pservice.adduser(body).subscribe(
  //   (res: any) => {
  //     console.log(res)
  //     // localStorage.setItem('user', res.user)
  //     this.router.navigate(['/login'])
  //     //localStorage.setItem('user', JSON.stringify(res.data.user))
  //   })


}
