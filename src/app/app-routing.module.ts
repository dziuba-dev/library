import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {authGuard} from "./core/guards/auth.guard";

const routers: Routes = [
  {
    path: 'book',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/book/book.module').then(m => m.BookModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'book',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'book'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routers)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
