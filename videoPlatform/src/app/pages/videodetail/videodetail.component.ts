import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService ,NbCardModule} from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
import {Video} from '../../models/Video';
import {User} from '../../models/User';
import {Comment} from '../../models/Comment';
import {UserService} from '../../server/user.service';
import {VideoService} from '../../server/video.service';

@Component({
  selector: 'app-videodetail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit {

  

  constructor(private videoService: VideoService,
              private userService: UserService) {
                

               }

  ngOnInit(): void {
  }

  likeClicked = false;
  favoriteClicked = false;
  followClicked = false;

  addComment(){

  }

  likeClick(){
    
  }
  favoriteClick(){

  }
  addFollow(){

  }
}
