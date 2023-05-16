import { Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent {
  products: any = [];
  page: number = 1;
  pageSize: number = 5;
  constructor(private joinservice: ProductService) { }
  // getJoin() {
  //   this.joinservice.getJoin().subscribe(
  //     (data: any) => { this.products = data; }
  //   );
  // }
  getJoinid(){
    const body = { page: this.page, pageSize: this.pageSize };
    this.joinservice.getJoinid(body).subscribe(
      (data: any) => { this.products = data; }
      );
    }
    nextPage() {
      this.page++;
      this.getJoinid();
    }
  
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.getJoinid();
      }
    }
    onPageSizeChange() {
      this.page = 1; // Reset the page to 1 when changing page size
      this.getJoinid();
    }
}