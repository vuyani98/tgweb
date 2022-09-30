import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tgapp';
  showMen = 'block'

  constructor(private router: Router, private actRoute: ActivatedRoute){

    this.router.events.subscribe(event => {

      if (this.router.url == "/auth/login" || this.router.url == "/auth/signup"){
        this.showMen = 'None'
      }

      else{
        this.showMen = 'block'
      }
    })
  }


}
