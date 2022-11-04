import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  isFormDisplayed = 'none';
  formHeader: string = '';
  formDisplayed = '';

  generalEnqForm = this.formBuilder.group({
    email: '',
    name: '',
    enquiry: 'General Enquiry',
    message: ''
  })

  productEnqForm = this.formBuilder.group({
    email: '',
    name: '',
    enquiry: 'Product Enquiry',
    message: ''
  })

  constructor(private formBuilder : FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
  }

  generalEnq(){

    this.http.post('https://formspree.io/f/mpznonjn',
        { name: this.generalEnqForm.get('name')?.value , replyto: this.generalEnqForm.get('email')?.value, message: this.generalEnqForm.get('message')?.value })
        .subscribe(
          response => {
            console.log(response);
          }
    );
    this.generalEnqForm.reset();
    this.isFormDisplayed = 'none';
  }

  productEnq(){
    this.http.post('https://formspree.io/f/mpznoeqy',
        { name: this.productEnqForm.get('name')?.value , replyto: this.productEnqForm.get('email')?.value, message: this.productEnqForm.get('message')?.value })
        .subscribe(
          response => {
            alert('Query Sent');
          }
    );
    this.productEnqForm.reset();
    this.isFormDisplayed = 'none';
  }

  enquires(name:string){
    this.formHeader = name;
    this.formDisplayed = name;
    this.isFormDisplayed = 'block'

  }

  close(){
    this.generalEnqForm.reset();
    this.productEnqForm.reset();
    this.isFormDisplayed = 'none';
  }
}
