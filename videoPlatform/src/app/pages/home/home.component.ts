import { Component, OnInit } from '@angular/core';
import {UserService} from '../../server/user.service';
import {User} from '../../models/User';
import {Video} from '../../models/Video';
import {SafePipe} from '../pipe/SafePipe';
import {Tags} from '../../models/Tags';
import {VideoService} from "../../server/video.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user1: User;
  user2: User;
  slideIndex = 1;
  tags = Tags;
  localtags: string[] = [];
  url = 'https://www.youtube.com/embed/3yxNUbYZEWU';
  videoList: Array<Array<Video>>;

  constructor(private userService: UserService, public videoService: VideoService) {
  }


  ngOnInit(): void {
    this.getvideos();
  }

  getvideos(): void{
    for (let i = 0 ; i < this.tags.length; i++) {
      this.videoService.getVideoByTag(this.tags[i]).subscribe(
        videos => {
          if (videos !== undefined ){
            this.localtags.push(this.tags[i]);
            this.videoList.push(videos);
          }
        }
      )
    }
  }
}
