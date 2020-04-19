import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../../server/user.service';
import { VideoService } from '../../server/video.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Video } from 'src/app/models/Video';

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

  buttonText = "";
  fileArr = [];

  formpicker = new Date().getDate;
  
  userid: string;
  videourl: string;
  video:Video;
  user:User;
  videoid:string;
  videos: Video[];//my video
  likes:Video[];
  sub:User[];//看情况
  

  constructor(private renderer: Renderer2, private authService: NbAuthService,
    private userService: UserService,
    private videoService: VideoService,
    private route:ActivatedRoute) {
    
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
  }

  ngOnInit(): void {
    //this.route.url.subscribe(url => {this.userid = url[2].toString()});
    //console.log(this.userid);
    
    this.userService.getUserById(this.userid).toPromise().then(user =>{
      this.user = user;

      
    });
      // this.videoService.getVideoById(this.videoid).toPromise().then(video => {
      //   this.video = video;
      // });
      // this.videos = this.user.videos;
      // this.likes = this.user.likes;

    this.videourl = this.videoService.getVideoImgURL(this.video.detail);

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
