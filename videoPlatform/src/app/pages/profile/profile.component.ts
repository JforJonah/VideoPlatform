import { Component, OnInit } from '@angular/core';
import {Route, ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
