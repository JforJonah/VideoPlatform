import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { UserService } from '../../server/user.service';
import { VideoService } from '../../server/video.service';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Video } from 'src/app/models/Video';
import { User } from 'src/app/models/User';
//import { url } from 'inspector';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  //[x: string]: any;
  @ViewChild("file1") file: ElementRef;


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
    // "Watch Later",
    // "Setting",
  ];
  tabKey ="My Video";
  tabKeyL ="Liked";
  tabKeyS ="Subscription";
  videourl: string;
  buttonText = "";
  fileArr = [];

  //formpicker = new Date().getDate;

  video:Video;

  user: User;
  videoid: string;
  videos: Array<Video>;//my video
  videoIds: Array<string>;
  likes: Video[]; //likes 后面声明
  realsub: Array<User>;
  sub: Array<User>//看情况


  requestId:string;

  // picFile:File;



  constructor(private renderer: Renderer2, private authService: NbAuthService,
              private userService: UserService,
              private videoService: VideoService,
              private route:ActivatedRoute) {
    this.sub =new Array();
    this.videos =new Array(); //my video
    this.likes = new Array(); //likes声明数组 找like的video
    //this.videourl = this.videoService.getVideoImgURL(this.video.url);
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.requestId = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
          console.log(this.requestId);
          this.getMyVideos(this.requestId);
        }
      });
  }



  ngOnInit(): void {
    this.userService.getUserById(this.requestId).toPromise().then(user =>{
      this.user = user;
    });
    console.log(this.user);
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

  }

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
      // case "Watch Later":
      //   this.buttonText = "Cancel";
      //   break;
      default:
        this.buttonText = "";
    }
  }

  onSave() {
    this.user.username = '';
    this.userService.updateUser(this.user);
    alert('Save SUCCESSFULLY');
  }

  deleteItem(){//删除需要与后端连接
    // var deleteitem = confirm('Delete?')
    // if(deleteitem){
    this.Arr.forEach((item) => (item.edit = true));
    //}
    //window.location.assign('');
  }

  del(event, index) { //这个也需要
    event.stopPropagation();
    this.Arr.splice(index, 1);
  }

  upload1(){
    this.file.nativeElement.click();
  }

  upload(){     //头像上传有问题

    var file: File = this.fileArr.pop()
    var form = new FormData()
    form.append("file1", file)
    this.userService.uploadProfileImg(form).toPromise().then();


  }
  // onPicfileChange(event){//加了事件一直显示报错不知道为啥
  //   if(event.target.files){
  //     const [file] = event.target.files;
  //     this.picFile = file;
  //   }
  // this.picfile = event.target.file[0];
  // let Url = window.URL.createObjectURL(this.picfiles);
  // this.Url = this.sanitizer.bypassSecurityTrustUrl(Url);
  // console.log(Url);
  //}



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

  //pagesId = "My Video";
  // returnMyvideo(){ //编辑完视频之后应该回到My video页面 这里还有问题
  //   if(this.pagesId !== 'My Video') return this.pagesId = "My Video";
  //   this.pagesId = "My Video";
  //   this.editFlag = false;
  // }
  ngAfterViewInit(): void { //这边应该需要改的吧 打开网站这里一直显示未定义 不知道怎么和后端连起来
    this.renderer.listen(this.file.nativeElement, "change", (event) => {
      console.log(event);
      let files = event.target.files;
      this.fileArr = [];
      for(let index = 0; index < files.length; index++) {
        const file = files[index];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          file.url = this.result;
        };
        this.fileArr.push(file);
      }
      console.log(this.fileArr);
      this.file.nativeElement.value = "";
    });
  }
}



// import {
//   Component,
//   OnInit,
//   ViewChild,
//   ElementRef,
//   Renderer2,
// } from "@angular/core";

// @Component({
//   selector: "app-profile",
//   templateUrl: "./profile.component.html",
//   styleUrls: ["./profile.component.scss"],
// })
// export class ProfileComponent implements OnInit {
//   @ViewChild("file1") file: ElementRef;

//   // init Random Nubmer
//   Arr = Array.from(
//     { length: Math.floor(Math.random() * 10) },
//     (item, index) => {
//       return { number: index, edit: false };
//     }
//   );
//   // tab list
//   tabs = [
//     "User Info",
//     "My Video",
//     "Liked",
//     "Subscription",
//     "Watch Later",
//     "Settings",
//   ];
//   tabKey = "My Video"; // selectTabKey

//   buttonText = "";
//   fileArr = [];

//   formpicker = new Date();
//   constructor(private renderer: Renderer2) {}

//   ngOnInit(): void {}

//   //  tabs click function
//   setKey(event) {
//     console.log(event.tabTitle);
//     this.tabKey = event.tabTitle;

//     this.Arr = Array.from(
//       { length: Math.floor(Math.random() * 10) },
//       (item, index) => {
//         return { number: index, edit: false };
//       }
//     );
//     switch (event.tabTitle) {
//       case "My Video":
//         this.buttonText = "Delete Video";
//         break;
//       case "Liked":
//         this.buttonText = "UnLike";
//         break;
//       case "Subscription":
//         this.buttonText = "取消订阅";
//         break;
//       case "Watch Later":
//         this.buttonText = "UnWatch";
//         break;
//       default:
//         this.buttonText = "";
//     }
//   }
//   //  from update function
//   onSave() {}

//   delectItem() {
//     this.Arr.forEach((item) => (item.edit = true));
//   }

//   del(event, index) {
//     event.stopPropagation(); // 取消事件向上冒泡
//     this.Arr.splice(index, 1);
//   }

//   unload() {
//     this.file.nativeElement.click();
//   }
//   editFlag: boolean = false;
//   editStatus() {
//     this.editFlag = true;
//   }
//   pageID = "home";
//   videoData = { title: "123", edit: true, number: 1 };
//   toEdit(data) {
//     if (!this.editFlag || this.tabKey !== 'My Video') return;
//     this.pageID = "edit";
//     this.videoData = data;
//     console.log(this.videoData);
//   }

//   reHome() {
//     this.pageID = "home";
//     this.editFlag = false;
//   }

//   editSAVE() {
//     this.pageID = "home";
//   }

//   ngAfterViewInit(): void {
//     //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
//     //Add 'implements AfterViewInit' to the class.
//     this.renderer.listen(this.file.nativeElement, "change", (event) => {
//       console.log(event);
//       let files = event.target.files;
//       this.fileArr = [];
//       for (let index = 0; index < files.length; index++) {
//         const file = files[index];
//         let reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = function (e) {
//           file.url = this.result;
//         };
//         this.fileArr.push(file);
//       }
//       console.log(this.fileArr);
//       this.file.nativeElement.value = "";
//     });
//   }
// }
