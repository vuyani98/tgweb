import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
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


  constructor(private router: Router, private actRoute: ActivatedRoute, private spinner: NgxSpinnerService){
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
    this.spinner.show();

    window.onload = () => {this.spinner.hide()}
      let cart = localStorage.getItem('cart')

      if (!cart){
        localStorage.setItem('cart', this.cartlist)
      }

      let cc = window as any;
      cc.cookieconsent.initialise({
        palette: {
          popup: {
            background: "#164969"
          },
          button: {
            background: "#ffe000",
            text: "#164969"
          }
        },
        theme: "classic",
        content: {
          //message: this.cookieMessage,
          //dismiss: this.cookieDismiss,
          //link: this.cookieLinkText,
          //href: environment.Frontend + "/dataprivacy"
        }
      });
    }
  }
