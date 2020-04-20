import { Component, OnInit } from '@angular/core';
import {UserService} from '../../server/user.service';
import {User} from '../../models/User';
import {Video} from '../../models/Video';
import {SafePipe} from '../pipe/SafePipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user1: User;
  user2: User;
  slideIndex = 1;

  url = 'https://www.youtube.com/embed/3yxNUbYZEWU';

  constructor(private userService: UserService) {
    userService.getUserById('5e992c9b5a991c1bba3418b7').subscribe(user2 => this.user2 = user2);
  }


  ngOnInit(): void {
  }
}
