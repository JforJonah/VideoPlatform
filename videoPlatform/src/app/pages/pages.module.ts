import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import {
  NbActionsModule, NbButtonModule, NbCardModule,
  NbContextMenuModule, NbDatepickerModule,
  NbIconModule,
  NbLayoutModule, NbMenuModule, NbOptionModule, NbSelectModule,
  NbStepperModule, NbTabsetModule, NbToggleModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {FollowsComponent} from './follows/follows.component';
import {HistoryComponent} from './history/history.component';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {UploadvideoComponent} from './uploadvideo/uploadvideo.component';
import {VideodetailComponent} from './videodetail/videodetail.component';
import {WatchlaterComponent} from './watchlater/watchlater.component';


@NgModule({
  declarations: [
    ProfileComponent,
    FavoriteComponent,
    FollowsComponent,
    HistoryComponent,
    HomeComponent,
    NavBarComponent,
    UploadvideoComponent,
    VideodetailComponent,
    WatchlaterComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbIconModule,
    NbUserModule,
    NbContextMenuModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbTabsetModule,
    NbSelectModule,
    NbOptionModule,
    NbDatepickerModule,
    NbCardModule,
    NbToggleModule
  ]
})
export class PagesModule { }
