import { Component, OnInit } from '@angular/core';
import {NbMenuService} from '@nebular/theme';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  item: [{ title: 'profile' }, { title: 'logout' }];

  constructor() { }

  ngOnInit(): void {
  }

}
