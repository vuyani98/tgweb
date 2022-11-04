import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cartObjects:any;
  total: number = 0;

  constructor(private route: Router, private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit(): void {

    let cart = localStorage.getItem('cart');
    if(!cart)[
      this.route.navigateByUrl('/not-found')
    ]
    cart = '[' +cart+ ']'
    let cartObj;
    if (cart != null){
      cartObj = JSON.parse(cart)
      this.cartObjects = cartObj
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

}
