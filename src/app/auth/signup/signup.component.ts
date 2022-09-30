import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  registerForm = this.formBuilder.group({

    username: '',
    email: '',
    password: '',
    isReseller: false
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService ) { }

  ngOnInit(): void {
  }


  onSubmit(): void {
    //process registration data here
    this.authService.register(this.registerForm.value).subscribe(res => {
      return res
      })
    this.registerForm.reset()
  }
}
