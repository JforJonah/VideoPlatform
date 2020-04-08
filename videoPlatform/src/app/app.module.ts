import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbIconModule,
  NbUserModule,
  NbContextMenuModule, NbStepperModule, NbMenuService, NbMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AuthComponent } from './auth/auth.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { VideodetailComponent } from './pages/videodetail/videodetail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';
import { WatchlaterComponent } from './pages/watchlater/watchlater.component';
import { HistoryComponent } from './pages/history/history.component';
import { UploadvideoComponent } from './pages/uploadvideo/uploadvideo.component';
import {ReactiveFormsModule} from '@angular/forms';
import { FollowsComponent } from './pages/follows/follows.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavBarComponent,
    HomeComponent,
    VideodetailComponent,
    ProfileComponent,
    FavoriteComponent,
    WatchlaterComponent,
    HistoryComponent,
    UploadvideoComponent,
    FollowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbIconModule,
    NbUserModule,
    NbContextMenuModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbMenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
