import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: any;
  constructor(private formBuilder: FormBuilder, private pservice: ProductService,
    private router: Router) { this.iniliza() }
  iniliza() {

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let body = this.registerForm.getRawValue()
    console.log(body)
    this.pservice.adduser(body).subscribe(
      (res: any) => {
        console.log(res)
        // localStorage.setItem('user', res.user)
        this.router.navigate(['/login'])
        //localStorage.setItem('user', JSON.stringify(res.data.user))
      })
  }
}