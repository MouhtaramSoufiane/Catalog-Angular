import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./Components/products/products.component";
import {HomeComponent} from "./Components/home/home.component";
import {LoginComponent} from "./login/login.component";
import {CustomersComponent} from "./customers/customers.component";
import {HelpComponent} from "./Components/help/help.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";


const routes: Routes = [

  {path:"admin",component:AdminTemplateComponent,children:[
      {path:"products",component:ProductsComponent},
      {path:"help",component:HelpComponent},
      {path:"customers",component:CustomersComponent},
      {path:"home",component:HomeComponent}
    ],canActivate:[AuthenticationGuard]},

  {path:"login",component:LoginComponent},
  {path:"",component:LoginComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

}
