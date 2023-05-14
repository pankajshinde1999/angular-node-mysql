import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any;
  constructor(private formBuilder: FormBuilder, private pservice: ProductService,
    private router: Router) { this.iniliza() }
  iniliza() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let body = this.loginForm.getRawValue()
    console.log(body)
    this.pservice.getLogin(body).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.setItem('user', res.user)
        this.router.navigate(['/home'])
        //localStorage.setItem('user', JSON.stringify(res.data.user))
      })
  }
}
