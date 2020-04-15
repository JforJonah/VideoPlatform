import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-videodetail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addcomment(){}

}
