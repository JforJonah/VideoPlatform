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
import { JsonpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-videodetail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit {
// button clicked
likeClicked =false;
favoriteClicked =false;
followClicked =false;



//comment text
commentTxt : string;

//video Id
videoId:string;

//video
video:Video;

//user
userid;
user:User;

//video-url
videoUrl:string;

//comment-list
comments:Comment[];

//video-list
videos:Video[];
  

  constructor(private videoService: VideoService,
              private userService: UserService,
              private route:ActivatedRoute,
              private authService: NbAuthService,) {

                //video-list
                var videos:Video[];

                //video
                this.video=new Video("","","","");

                //user
                //this.user = new User();

  
                //console.log(this.video.id);
                //get userid
                this.authService.onTokenChange()
                    .subscribe((token: NbAuthJWTToken) => {

                      if (token.isValid()) {
                        this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
                      }

                    });

                  console.log("userid",this.userid);

                this.userService.getUserById(this.userid).toPromise().then(user =>{
                  this.user=user;
                  //console.log(user.liked.includes(this.videoId));
                  if(user.favorite.includes(this.videoId)){
                    this.favoriteClicked=true;
                    
                  }
                  else{
                    this.favoriteClicked=false;
                  }

                  //video-list add
                  for(var i =0;i<user.videos.length;i++){
                    //console.log(user.videos[i])
                    this.videoService.getVideoById(user.videos[i])
                    .subscribe(video1 =>{
                      //console.log(video1)
                      var video2={
                        id: video1.id,
                        auth: video1.auth,
                        title: video1.title,
                        url: video1.url,
                        description: "",
                        createdDate: new Date(),
                        like:[],
                        unlike:[], 
                        comments:[],
                      };
                      this.videos.push(video2);
                     })
                  }
                })
                //console.log(this.likeClicked)
                //console.log(this.user.id);

                //get videoid
                this.route.url.subscribe(url=>{this.videoId=url[1].toString()});
                console.log(this.videoId)
                this.videoService.getVideoById(this.videoId).toPromise().then(video =>{
                  this.comments=video.comments;
                  this.video=video;
                  //console.log(video.like.includes(this.userid))

                  //init button
                  if(video.like.includes(this.userid)){
                    this.likeClicked=true;
                  }
                  else{
                    this.likeClicked=false;
                  }
                  console.log(this.likeClicked)

                  //this video url
                  this.videoUrl=this.videoService.getVideoURL(video.url);
                  console.log(this.videoUrl)
                  
                })
                

               }

  ngOnInit(): void {
  //   this.userService.getUserById(this.userid).toPromise().then(user =>{
  //   for(var i =0;i<user.videos.length;i++){
  //     //console.log(user.videos[i])
  //     this.videoService.getVideoById(user.videos[i])
  //     .subscribe(video1 =>{
  //       //console.log(videos)
  //       this.videos.push(video1);
  //     })
  //   }
  // })
  }

  

  addComment(){
    var newComment={
      id: "",
      txt: this.commentTxt,
      videoId: this.videoId,
      createDate: new Date(),
      auth: this.user.username,
    };
    console.log(this.video.comments)
    //var len = this.video.comment.length+1;
    // newComment.id = "0";
    // newComment.videoId=this.videoId;
    // newComment.createDate = new Date();
    // newComment.txt = this.commentTxt;
    // newComment.auth = this.userid;

    this.video.comments.push(newComment);
    this.commentTxt='';

    //update database
    this.videoService.updateVideo(this.video)
      .subscribe(video =>{
        this.video = video;
        this.video.comments=video.comments;
      });
    

  }

  likeClick(){
    console.log(this.likeClicked)
    
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
    this.likeClicked =!this.likeClicked;
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
    var author:User;

    if(!this.followClicked){
    this.videoService.getAuthor(this.video).subscribe(user =>{
      author=user;
    })
    this.userService.subscribeUser(author).toPromise().then()

    }
    else if(this.followClicked){
      var author:User;

      this.videoService.getAuthor(this.video).subscribe(user =>{
      author=user;
    })
    this.userService.unSubscribeUser(author).toPromise().then()
    }
  }
}
