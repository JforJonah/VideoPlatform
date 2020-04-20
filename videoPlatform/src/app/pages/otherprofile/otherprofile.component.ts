import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../server/user.service";
import {VideoService} from "../../server/video.service";

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.scss']
})
export class OtherprofileComponent implements OnInit {
  profile: User;
  followClicked = true;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location,
              private videoService: VideoService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id).subscribe(profile => this.profile);
  }

  addFollow(){

    if (!this.followClicked) {
      this.userService.subscribeUser(this.profile).toPromise().then();

    } else {
      this.userService.unSubscribeUser(this.profile).toPromise().then()
    }
  }

}
