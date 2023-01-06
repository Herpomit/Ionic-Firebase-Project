import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { KayitComponent } from './components/kayit/kayit.component';
import { LoginComponent } from './components/login/login.component';
import { UyeComponent } from './components/uye/uye.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'uyeler',
    component: UyeComponent
  },
  {
    path: 'kategoriler',
    component: KategoriComponent,
  },
  {
    path: 'kayit',
    component: KayitComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
