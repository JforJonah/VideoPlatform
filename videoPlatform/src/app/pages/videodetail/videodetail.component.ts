import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService ,NbCardModule} from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
import {Video} from '../../models/Video';
import {User} from '../../models/User';
import {Comment} from '../../models/Comment';
import {UserService} from '../../server/user.service';
import {VideoService} from '../../server/video.service';
import {ActivatedRoute} from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'app-videodetail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit {

  

  constructor(private videoService: VideoService,
              private userService: UserService,
              private route:ActivatedRoute,
              private authService: NbAuthService,) {

                //get videoid
                this.route.url.subscribe(url=>{this.videoId=url[1].toString()});
                console.log(this.videoId)
                this.videoService.getVideoById(this.videoId).subscribe(video =>{
                  this.video=video;
                })
                //console.log(this.video.id);
                //get userid
                this.authService.onTokenChange()
                    .subscribe((token: NbAuthJWTToken) => {

                      if (token.isValid()) {
                        this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
                      }

                    });

                  console.log("userid",this.userid);

                this.userService.getUserById(this.userid).subscribe(user =>{
                  this.user=user;
                })
                //console.log(this.user.id);

                //set button
                //like
                // for(var i =0;i<this.video.like.length;i++){
                //   if(this.video.like[i]==this.userid){
                //     this.likeClicked = true;
                //   }
                // }

                //favorite
                // for(var i =0;i<this.user.favorite.length;i++){
                //   if(this.user.favorite[i]==this.videoId){
                //     this.favoriteClicked = true;
                //   }
                // }

               }

  ngOnInit(): void {
    
    
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

  //user
  userid;
  user:User;


  
  

  addComment(){
    var newComment:Comment;
    var len = this.video.comment.length+1;
    newComment.id = len.toString();
    newComment.videoId=this.videoId;
    newComment.createDate = new Date();
    newComment.txt = this.commentTxt;
    newComment.auth = this.userid;

    this.video.comment.push(newComment);
    this.commentTxt='';

    //update database
    this.videoService.updateVideo(this.video)
      .subscribe(video =>{
        this.video = video;
      });
    

  }

  likeClick(){
    if(!this.likeClicked){
      if(!this.video.like.includes(this.userid)){
        this.video.like.push(this.userid);
        this.userService.likeVideo(this.video).toPromise().then()
      }
      
      //this.user.liked.push(this.videoId);
      //update database
      this.videoService.updateVideo(this.video)
      .subscribe(video =>{
        
        this.video = video;
      });

      // this.userService.updateUser(this.user)
      // .subscribe(user =>{
      //   this.user=user;
      // })
      
      //console.log(this.video.like);
      //console.log(this.user.liked);


    }
    else if(this.likeClicked){
      for(var i=0;i<this.video.like.length;i++){
        if(this.video.like[i]==this.userid){
          this.video.like.splice(i,1);
          this.userService.unlikeVideo(this.video).toPromise().then()
          // if(this.video.like==undefined){
          //   this.video.like=[];
          // }
        }
      }
      
      //update database
      this.videoService.updateVideo(this.video)
      .subscribe(video =>{
        this.video = video;
      });
      //console.log(this.video.like);

      // this.userService.updateUser(this.user)
      // .subscribe(user =>{
      //   this.user=user;
      // })
    }
  }

  //click favorite btn
  favoriteClick(){
    //console.log("before",this.user.favorite);

    if(!this.favoriteClicked){
      
      var user = this.user;
      if(!user.favorite.includes(this.videoId)){
        //user.favorite.push(this.videoId);
        this.userService.setFavoriteVideo(this.video).toPromise().then()
        // this.userService.getUserById(this.userid).toPromise().then(user =>{
        //   this.user=user;
        // })
      }

    }
    else if(this.favoriteClicked){
      this.userService.unFavoriteVideo(this.video).toPromise().then()
    }


  }
  addFollow(){

  }
}
