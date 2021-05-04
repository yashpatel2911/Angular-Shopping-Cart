import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component'
import { CartComponent } from './cart/cart.component'
import { SampleFormsComponent } from './sample-forms/sample-forms.component'

const routes: Routes = [
  { path:'menu', component: ProductListComponent },
  { path:'cart', component: CartComponent },
  { path:'form', component: SampleFormsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
