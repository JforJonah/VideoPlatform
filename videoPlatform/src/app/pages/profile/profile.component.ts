import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  titleArr =['My Video', 'Liked Videos', 'Subscirptions', 'History'];
  title: string;
  Arr = [1, 2, 3, 4];
  Arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  pageStatus ='proPage';
  constructor() { }

  ngOnInit(): void {}

  more(title){
    console.log(title);
    this.pageStatus = 'morePage';
    this.title = title;
  }
  return(){
    this.pageStatus = 'proPage';
  }
}
