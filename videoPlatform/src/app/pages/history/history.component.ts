import { Component, OnInit } from '@angular/core';
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {UserService} from "../../server/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  userid;
  profile: User;
  constructor(private authService: NbAuthService, private userService: UserService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
    userService.getUserById(this.userid).subscribe(profile => this.profile = profile);
  }

  ngOnInit(): void {
  }

  removeFromHistory(): void{
  }
}
