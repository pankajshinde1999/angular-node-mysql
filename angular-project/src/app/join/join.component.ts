import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  products: any = [];
  constructor(private joinservice: ProductService) { }
  getJoin() {
    this.joinservice.getJoin().subscribe(
      (data: any) => { this.products = data; }
    );
  }
}