import { Component, OnInit } from '@angular/core';
import { VideoService } from './../../../server/video.service';
import { UserService } from './../../../server/user.service';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Video } from 'src/app/models/Video';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-editvideo',
  templateUrl: './editvideo.component.html',
  styleUrls: ['./editvideo.component.scss']
})
export class EditvideoComponent implements OnInit {

  videos: Array<Video> = [];
  video: Video;
  userId: string;

  constructor(private userService: UserService,
              public videoService: VideoService,
              private route:ActivatedRoute) { 
                
              }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe(
      profile => profile.videos.forEach(
        videoid => this.videoService.getVideoById(videoid).subscribe(
          video => this.videos.push(video)
        )
      )
    );
  }


  deleteItem(){
    this.videoService.deleteVideo(this.video).subscribe();
  }

  editSave(){
    
  }
}
