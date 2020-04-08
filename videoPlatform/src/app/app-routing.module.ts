import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent} from './pages/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import {FavoriteComponent} from './pages/favorite/favorite.component';
import {UploadvideoComponent} from './pages/uploadvideo/uploadvideo.component';
import {HistoryComponent} from './pages/history/history.component';
import {WatchlaterComponent} from './pages/watchlater/watchlater.component';
import {FollowsComponent} from './pages/follows/follows.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'favorite', component: FavoriteComponent},
  {path: 'upload', component: UploadvideoComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'watchlater', component: WatchlaterComponent},
  {path: 'follows', component: FollowsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
