import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as globals from '../assets/globals';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'tgapp';
  showMen = 'block'
  cartlist:  string = ''


  constructor(private router: Router, private actRoute: ActivatedRoute){
    this.router.events.subscribe(event => {

      if(this.router.url == "/cart"){
        localStorage.setItem('listen2pay', 'true')
      }

      else{
        localStorage.setItem('listen2pay', 'false')
      }

      if (this.router.url == "/auth/login" || this.router.url == "/auth/signup"){
        this.showMen = 'None'
      }

      else{
        this.showMen = 'block'
      }
    })
  }

  ngOnInit(): void {
      let cart = localStorage.getItem('cart')

      if (!cart){
        localStorage.setItem('cart', this.cartlist)
      }
  }


}
