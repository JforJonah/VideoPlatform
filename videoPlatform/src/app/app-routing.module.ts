import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent} from './pages/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
