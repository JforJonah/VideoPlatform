import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService ,NbCardModule} from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
import {Video} from '../../models/Video';
import {User} from '../../models/User';
import {Comment} from '../../models/Comment';
import {UserService} from '../../server/user.service';
import {VideoService} from '../../server/video.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-videodetail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit {

  

  constructor(private videoService: VideoService,
              private userService: UserService,
              private route:ActivatedRoute) {


               }

  ngOnInit(): void {
    this.route.url.subscribe(url=>{this.videoId=url[2].toString()});
    //console.log(this.videourl)
    this.videoService.getVideoById(this.videoId).toPromise().then(video =>{
      this.video=video;
    })
    
  }

  // button clicked
  likeClicked = false;
  favoriteClicked = false;
  followClicked = false;

  //comment text
  commentTxt : string;

  //video Id
  videoId:string;
  
  //video
  video:Video;

  addComment(){
    var newComment:Comment;
    var len = this.video.comment.length+1;
    newComment.id = len.toString();
    newComment.videoId=this.videoId;
    newComment.createDate = new Date();
    newComment.txt = this.commentTxt;

    this.video.comment.push(newComment);


  }

  likeClick(){
    
  }
  favoriteClick(){

  }
  addFollow(){

  }
}
