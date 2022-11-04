import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  deliver: boolean = true;
  btnDsply:string = 'none'
  purchasedItems: any = [];
  total = localStorage.getItem('total')
  items = localStorage.getItem('items')
  purchaseForm = this.formBuilder.group({
    name : '',
    email: '',
    street: '',
    complex: '',
    surburb: '',
    city: '',
    province: '',
    postalCode: '',
    delivery: this.deliver
  })

  constructor( private formBuilder : FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    let cart = localStorage.getItem('cart');
    cart = '[' +cart+ ']'
    let cartObj;
    if (cart != null){
      cartObj = JSON.parse(cart)

      for (let i=0; i<cartObj.length; i++){
        this.purchasedItems.push(cartObj[i]['product_code'])
      }
      console.log(this.purchasedItems)
    }
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

  submit(){

    let message1 = `Stay alert for a payment for a purchase of ${this.purchasedItems} costing ${this.total} by ${this.purchaseForm.get('name')?.value} to be delivered at ${this.purchaseForm.get('street')?.value}
                ${this.purchaseForm.get('complex')?.value} ${this.purchaseForm.get('surburb')?.value} ${this.purchaseForm.get('city')?.value}
                ${this.purchaseForm.get('Province')?.value}, postal code : ${this.purchaseForm.get('postalCode')?.value}` ;

    let message2 = `Stay alert for a payment for a purchase of ${this.purchasedItems} costing ${this.total} to be collected  by ${this.purchaseForm.get('name')?.value}` ;

    this.http.post('https://formspree.io/f/mnqroygr', {
      name : this.purchaseForm.get('name')?.value,
      replyto : this.purchaseForm.get('email')?.value,
      message : this.deliver ? message1 : message2
    }).subscribe( response => console.log(response));

    this.purchaseForm.reset();
  }

}
