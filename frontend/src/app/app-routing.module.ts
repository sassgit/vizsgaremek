import { ArtistComponent } from './page/artist/artist.component';
import { CustomerComponent } from './page/customer/customer.component';
import { LoginComponent } from './page/login/login.component';
import { OrderComponent } from './page/order/order.component';
import { PaintingComponent } from './page/painting/painting.component';
import { PhotoComponent } from './page/photo/photo.component';
import { UserComponent } from './page/user/user.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'artist',
    component: ArtistComponent
  },
  {
    path: 'customer',
    component: CustomerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'painting',
    component: PaintingComponent
  },
  {
    path: 'photo',
    component: PhotoComponent
  },
  {
    path: 'user',
    component: UserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
