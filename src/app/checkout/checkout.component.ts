import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  deliver: boolean = true;
  btnDsply:string = 'none'
  total = localStorage.getItem('total')
  items = localStorage.getItem('items')

  constructor() { }

  ngOnInit(): void {
  }

  tobeDelivered(value:any){

    if(value.value == 'collect'){
      this.deliver = false
      this.btnDsply = 'block'
    }

    else{
      this.deliver = true
      this.btnDsply = 'none'
    }
  }

}
