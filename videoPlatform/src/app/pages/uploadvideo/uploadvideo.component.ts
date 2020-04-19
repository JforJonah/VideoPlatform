import { Component, OnInit } from '@angular/core';
import {NbStepperComponent} from '@nebular/theme';
import {VideoService} from '../../server/video.service';
import {Video} from '../../models/Video';
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {UserService} from "../../server/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-uploadvideo',
  templateUrl: './uploadvideo.component.html',
  styleUrls: ['./uploadvideo.component.scss']
})
export class UploadvideoComponent implements OnInit {
  form: any;
  video: Video;
  userid: string;
  profile: User;
  videoUrl: string;
  videoTitle: string;
  videourl: string;
  constructor(private nbStepperComponent: NbStepperComponent,
              private videoService: VideoService,
              private authService: NbAuthService,
              private userService: UserService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
    this.userService.getUserById(this.userid).subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {
    this.video = new Video(this.profile.username, '', '', '');
  }

  Step1next(){
    this.nbStepperComponent.next();
  }
  previous(){
    this.nbStepperComponent.previous();
  }

  getYoutubeURL(url: string): boolean{
    if (url !== null ){
      const temp = url.replace('https://www.youtube.com/watch?v=', '');
      if (temp === null) { return false; }
      this.video.url = temp;
      return true;
    }
    return false;
  }

}
