import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  cartObjects:any;
  total: number = 0;

  constructor(private route: Router) { }

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
    localStorage.setItem('cart', new_cart)
  }

  calcTotal(){
    this.total = 0;
    for (let i=0; i<this.cartObjects.length; i++){
      let price = this.cartObjects[i].price
      price = price.slice(2)
      price = Number(price.replace(/[^0-9.-]+/g,""));
      //console.log(price)
      //console.log(parseFloat(price))
      this.total += price
      console.log(this.total.toFixed(2))
    }
  }

}
