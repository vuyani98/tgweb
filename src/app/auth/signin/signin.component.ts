import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit,OnDestroy {

  loginForm = this.formBuilder.group({
    identifier: '',
    password: ''
  })

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      localStorage.setItem('showMen', 'false')
  }
  ngOnDestroy(): void {
      localStorage.setItem('showMen', 'true')
  }

  onLogin():void{

    this.authService.login(this.loginForm.value).subscribe(res => {
      return res;
    })

    this.loginForm.reset();
  }

}
