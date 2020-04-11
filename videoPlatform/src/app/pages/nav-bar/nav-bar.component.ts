import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  item: NbMenuItem[] = [
    {
      title: 'profile',
      link: 'profile'
    },
    {
      title: 'history',
      link: 'history'
    },
    { title: 'logout',
      link: 'logout'}
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
