import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-in/component/sign-up/sign-up.component';
import { ProfilesClientComponent } from './pages/profiles-client/profiles-client.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: 'product/:id',
  component: ProductDetailsComponent
},
{
  path: 'signIn',
  component: SignInComponent
},
{
  path: 'signUp',
  component: SignUpComponent
},
{
  path: 'profile/:username',
  component: ProfilesClientComponent
},
{
  path: 'order',
  component: OrdersComponent
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
