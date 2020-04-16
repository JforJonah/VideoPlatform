import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

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
    "Subscirption",
    "Watch Later",
    "Setting",
  ];
  tabKey ="My video";

  buttonText = "";
  fileArr = [];

  formpicker = new Date();
  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {}
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
        this.buttonText = "Unsubscrib";
        break;
      case "Watch Later":
        this.buttonText = "Cancel";
        break;
      default:
        this.buttonText = "";
    }
  }

  onSave() {}

  deleteItem(){
    this.Arr.forEach((item) => (item.edit = true));
  }

  del(event, index) {
    event.stopPropagation();
    this.Arr.splice(index,1);
  }

  upload(){
    this.file.nativeElement.click();
  }
  editFlag: boolean = false;
  editStatus(){
    this.editFlag = true;
  }

  pageID = "home";
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

ngAfterViewInit() : void {
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
    this.file.nativeElement.value = "";
  })
}
  
}
