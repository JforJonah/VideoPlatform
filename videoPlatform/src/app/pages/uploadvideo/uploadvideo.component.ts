import { Component, OnInit } from '@angular/core';
import {NB_STEPPER, NbStepperComponent} from '@nebular/theme';
import {VideoService} from '../../server/video.service';
import {Video} from '../../models/Video';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {UserService} from '../../server/user.service';
import {User} from '../../models/User';

@Component({
  selector: 'app-uploadvideo',
  templateUrl: './uploadvideo.component.html',
  styleUrls: ['./uploadvideo.component.scss'],
  providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent }],
})
export class UploadvideoComponent implements OnInit {
  form: any;
  video: Video;
  userid: string;
  profile: User;
  videoTitle: string;
  videoUrl: string;
  constructor(
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
    this.video = new Video('', '', '', '');
  }

  ngOnInit(): void {
  }

  step1next() {
    if (this.getYoutubeURL(this.videoUrl)){
      this.video.auth = this.profile.username;
      this.video.title = 'Live Letters';
      this.video.description = 'This is a video about Live Letter';
      this.videoService.uploadVideo(this.video).subscribe();
      // this.nbStepperComponent.next();
    }
  }
  previous() {
    // this.nbStepperComponent.previous();
  }

  getYoutubeURL(url: string): boolean {
    if (url !== null ) {
      const temp = url.replace('https://www.youtube.com/watch?v=', '');
      if (temp === null) { return false; }
      this.video.url = temp;
      return true;
    }
    return false;
  }

}
