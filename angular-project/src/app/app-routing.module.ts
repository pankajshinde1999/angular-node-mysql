import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import { JoinComponent } from './join/join.component';
import { loginGuard } from './login.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "home", component: AppComponent, canActivate: [loginGuard], children: [
      { path: "", component: HomeComponent },
      { path: "join", component: JoinComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "products", component: ProductsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
