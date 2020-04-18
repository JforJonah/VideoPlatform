import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import {User} from '../../models/User';
<<<<<<< HEAD
import {UserService} from "../../server/user.service";
=======
>>>>>>> master

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  item: NbMenuItem[] = [
    {
      title: 'profile',
      link: '/pages/profile'
    },
    {
      title: 'history',
      link: '/pages/history'
    },
    { title: 'logout',
      link: '/auth/logout'}
    ];

  userid;
  profile: User;

  constructor(private authService: NbAuthService, private userService: UserService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable
        }

      });

    console.log(this.userid._id);
    userService.getUserById(this.userid._id).subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {
  }

}
