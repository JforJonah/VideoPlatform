import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { UserService } from '../../server/user.service';
import { VideoService } from '../../server/video.service';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Video } from 'src/app/models/Video';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild("file1") file:ElementRef;


  Arr = Array.from(
    {length: Math.floor(Math.random() * 10)},
    (item, index) => {
      return {number: index, edit: false};
    }  
  );

  tabs= [
    "User Info",
    "My Video",
    "Liked",
    "Subscription",
    "Watch Later",
    "Setting",
  ];
  tabKey ="My Video";
  tabKeyL ="Liked";
  tabKeyS ="Subscription";

  buttonText = "";
  fileArr = [];

  //formpicker = new Date().getDate;
  
  userid: string;
  videourl: string;
  video:Video;
  
  user:User;
  videoid:string;
  videos: Array<Video>;//my video
  videoIds:Array<string>;
  likes:Video[]; //likes 后面声明
  realsub:Array<User>;
  sub:Array<User>//看情况

  requestId:string;
  // videos:Array<Video>;
  

 

  constructor(private renderer: Renderer2, private authService: NbAuthService,
    private userService: UserService,
    private videoService: VideoService,
    private route:ActivatedRoute) {
      this.sub =new Array();
      this.videos =new Array(); //my video 
      this.likes = new Array(); //likes声明数组 找like的video
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.requestId = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
          console.log(this.requestId);
          this.getMyVideos(this.requestId);
        }
        console.log(this.videos)
      });
  }

  

  ngOnInit(): void {
    //this.route.url.subscribe(url => {this.userid = url[2].toString()});
    //console.log(this.userid);

    this.userService.getUserById(this.requestId).toPromise().then(user =>{
      this.user = user;
    });
    let length=0;
    this.userService.getUserById(this.requestId).subscribe(user=>{ //找到自己
      user.subscribe.forEach((Item)=>{
        this.userService.getUserById(Item).subscribe((fan)=>{ //通过subscribe里的id找到所有订阅的用户
          this.sub.push(fan); //sub存的真的用户
        })
      })
    });
    console.log(this.sub);

    this.userService.getUserById(this.requestId).subscribe(user=>{
      user.liked.forEach((Item)=>{
        this.videoService.getVideoById(Item).subscribe((ppl)=>{
          this.likes.push(ppl);
        })
      })
    });
    console.log(this.likes);
    //console.log(this.user + "1111");
    
      // this.videoService.getVideoById(this.videoid).toPromise().then(video => {
      //   this.video = video;
      // });
    
      // for(let i=0;i<length;i++){
      //   this.userService.getUserById(this.sub[i]).toPromise().then(user=>{this.realsub[i]=user,console.log(user)});
      // }

  }

  
  
  functionone() {
    // this.videoIds = this.user.videos;

    // console.log(this.videoIds);
    // this.likes = this.user.liked;
    // this.sub = this.user.subscribe;
    
    //this.videourl = this.videoService.getVideoImgURL(this.video.url);
        
    // for (let i = 0; i < this.videoIds.length; i++) {
    //   this.videos[i]=this.videoService.getVideoById(this.videoIds[i]);
      //console.log(this.videos);
      // this.videoService.getAllVideosFromAuthor()
    
  };
  getMyVideos(id:string):void{
    this.videoService.getAllVideosFromAuthor(id).toPromise().then(video=>{this.videos=video,console.log(video)});
  }

 



  setKey(event) {
    console.log(event.tabTitle);
    this.tabKey = event.tabTitle;

    this.Arr = Array.from(
      { length: Math.floor(Math.random() * 10) },
      (item, index) => {
        return {number: index, edit : false};
      }
    );
    switch (event.tabTitle) {
      case "My Video":
        this.buttonText = "Delete Video";
        break;
      case "Liked":
        this.buttonText = "Unlike";
        break;
      case "Subscription":
        this.buttonText = "Unsubscribe";
        break;
      case "Watch Later":
        this.buttonText = "Cancel";
        break;
      default:
        this.buttonText = "";
    }
  }

  onSave() {
    //加alert
    alert('Save SUCCESSFULLY');
  }

  deleteItem(){
    //var deleteitem = confirm('Delete?')
    //if(deleteitem){
      this.Arr.forEach((item) => (item.edit = true));
    //}
    //window.location.assign('');
  }

  del(event, index) {
    event.stopPropagation();
    this.Arr.splice(index, 1);
  }

  upload(){
    this.file.nativeElement.click();
  }
  editFlag: boolean = false;
  editStatus(){
    this.editFlag = true;
  }

  pageID = "home";
  //pages = "My Video";
  videoData = {title: "123", edit: true, number: 1};
  toEdit(data) {
    if (!this.editFlag || this.tabKey !== 'My Video') return;
    this.pageID = "edit";
    this.videoData = data;
    console.log(this.videoData);
  }

  returnHome(){
    this.pageID = "home";
    this.editFlag = false;
  }

  editSAVE() {
    this.pageID = "home";
  }

  returnMyvideo(){
    //this.pages = "My Video";
    //this.editFlag = false;
  }
ngAfterViewInit(): void {
  this.renderer.listen(this.file.nativeElement, "change", (event) => {
    console.log(event);
    let files = event.target.files;
    this.fileArr = [];
    for(let index = 0; index < files.length; index++) {
      const file = files[index];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        file.url = this.result;
      };
      this.fileArr.push(file);
    }
    console.log(this.fileArr);
    this.file.nativeElement.value="";
  });
}
  
}
