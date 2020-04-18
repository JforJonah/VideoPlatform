import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import {User} from '../../models/User';
import {UserService} from '../../server/user.service';
import {Video} from "../../models/Video";
import {VideoService} from "../../server/video.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  item: NbMenuItem[] = [
    {
      title: 'profile',
      link: '/pages/profile'
    },
    {
      title: 'history',
      link: '/pages/history'
    },
    { title: 'logout',
      link: '/auth/logout'}
    ];

  userid;
  profile: User;
  user2: User;

  constructor(private authService: NbAuthService, private userService: UserService, private videoService: VideoService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });

    console.log(this.userid);
    userService.getUserById(this.userid).subscribe(profile => this.profile = profile);
    // console.log(this.profile);
    userService.getUserById('5e992c9b5a991c1bba3418b7').subscribe(user2 => this.user2 = user2);
    // console.log(this.user2);
    // this.userService.subscribeUser(this.profile).subscribe(profile => this.profile);
    // console.log(this.profile);
  }

  ngOnInit(): void {
  }


  subuser(){
    console.log(`user2: ${this.user2.id}`);
    // this.userService.getUserById('5e992c9b5a991c1bba3418b7').subscribe(user2 => this.user2 = user2);
    this.userService.unSubscribeUser(this.user2).subscribe(profile => this.profile = profile);
    const url = 'helloword';
    const tag = 'gaming';
    const video: Video = new Video(this.profile.id, 'this is my description', {url , tag});
    this.videoService.uploadVideo(video).subscribe();

    this.videoService.getAuthor(video).subscribe(user => console.log(user.id));

    video.description = 'changed';
    this.videoService.updateVideo(video).subscribe();
    this.userService.likeVideo(video).subscribe();
    this.userService.setFavoriteVideo(video).subscribe();
    console.log(this.profile);

  }

}
