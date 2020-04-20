import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../server/user.service";

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.scss']
})
export class OtherprofileComponent implements OnInit {
  profile: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id).subscribe(profile => this.profile);
  }

}
