import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
<<<<<<< HEAD
import { FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

=======
import { HttpClient } from '@angular/common/http';
>>>>>>> b77f96084e77f082fd8ba1a6487218f71152466c

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cartObjects:any = {};
  products: any  = []
  total: number = 0;
<<<<<<< HEAD
=======
  products: any  = []
>>>>>>> b77f96084e77f082fd8ba1a6487218f71152466c
  isFormDisplayed = 'none';
  formHeader: string = '';
  formDisplayed = '';

  productEnqForm = this.formBuilder.group({
    email: '',
    name: '',
    enquiry: 'Product Enquiry',
    message: '',
  })
<<<<<<< HEAD

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private route: Router, private renderer: Renderer2, private element: ElementRef) { }
=======
  constructor(private route: Router, private renderer: Renderer2, private element: ElementRef, private formBuilder: FormBuilder, private http: HttpClient) { }
>>>>>>> b77f96084e77f082fd8ba1a6487218f71152466c

  ngOnInit(): void {

    let cart = localStorage.getItem('cart');
    if(!cart)[
      this.route.navigateByUrl('/not-found')
    ]
    cart = '[' +cart+ ']'
    let cartObj;
    if (cart != null){
      cartObj = JSON.parse(cart)
      this.cartObjects = cartObj;
    }
    this.calcTotal();

  }

  removeFromCart(index: number){

    let removedItem = JSON.stringify(this.cartObjects[index])

    if(index != (this.cartObjects.length - 1)){
      removedItem += ','
    }

    else if (index == 0){
      removedItem = removedItem
    }

    else{
      removedItem = ',' + removedItem
    }

    console.log(removedItem)
    this.cartObjects.splice(index, 1)
    console.log(this.cartObjects)
    this.calcTotal()
    let cart =  localStorage.getItem('cart') || ''
    let new_cart = cart.replace(`${removedItem}`, '')
    //let cart = this.cartObjects.toString()
    console.log(new_cart)
    let x = window.open("", "myWindow", "width=1,height=1");
    x?.localStorage.setItem('cart', new_cart);
    x?.close();

  }

  calcTotal(){
    this.total = 0;
    for (let i=0; i<this.cartObjects.length; i++){
      let price = this.cartObjects[i].price
      price = price.slice(1)
      price = Number(price.replace(/[^0-9.-]+/g,""));
      //console.log(price)
      //console.log(parseFloat(price))
      this.total += price
      //this.total = +this.total.toFixed(2)
    }
  }

  checkout(){
    let items = this.cartObjects.length

    localStorage.setItem('items', items.toString())
    localStorage.setItem('total', this.total.toString())
    this.route.navigateByUrl('/checkout')
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
    this.isFormDisplayed = 'block';

    let prody = []

    for (let i = 0; i < this.cartObjects.length; i++){
      prody[i] = this.cartObjects[i]['product_code'];
    }
    this.productEnqForm.patchValue({ message : `Enquire about  products :  ${prody}`})
  }
  close(){
    this.productEnqForm.reset();
    this.isFormDisplayed = 'none';
  }
<<<<<<< HEAD
=======

>>>>>>> b77f96084e77f082fd8ba1a6487218f71152466c
}
