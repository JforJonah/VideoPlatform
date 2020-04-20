import { Component, OnInit } from '@angular/core';
import {UserService} from "../../server/user.service";
import {User} from "../../models/User";
import {Video} from "../../models/Video";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user1: User;
  user2: User;
  slideIndex = 1;

  constructor(private userService: UserService) {
    userService.getUserById('5e992c9b5a991c1bba3418b7').subscribe(user2 => this.user2 = user2);
  }


  ngOnInit(): void {
    this.showSlides(this.slideIndex);
  }



// Next/previous controls
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

// Thumbnail image controls
  currentSlide(n: number) {
    this.showSlides(this. slideIndex = n);
  }

   showSlides(n: number) {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {this.slideIndex = 1;}
    if (n < 1) {this.slideIndex = slides.length;}
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style.display', 'none');
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].setAttribute('style.display', 'block');
    dots[this.slideIndex - 1].className += ' active';
  }
}
