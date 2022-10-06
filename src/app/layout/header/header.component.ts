import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  mega_menu_display = "none";
  cart_display = "none";
  menu_display = "none";
  products_display = "none";
  search_display = "none";
  mobile_cart_display = "block";
  mobile_sub_display = "none";
  mobile_prod_display = "none";
  mobile_menu_display = 'none'
  display_cart = 'none';
  cartLength = 0;

  catergories = {
    "Network" : {
        "Network" : [ "ColorVu", "AcuSense", "PRO", "Ultra", "Solar", "Special"],
        "PTZ" : ["Pro", "Ultra", "Special"],
        "NVR" : ["4CH", "8CH", "16CH"]
    },
    "TurboHD" : { "Analogue/Turbo Cameras" : [], "DVR": [] },
    "Transmission" : {"Switches" : []},
    "Mobile" : {"Dashcam" : []},
    "Access Control" : {
      "Biometric Reader" : [],
      "Fingerprint" : [],
      "Card Reader": [],
      "Face Recognition": [],
      "Controller": [],
      "Electrical Lock": []
    },
    "Video Intercomm" : {},
    "Alarm" : {"Monitors" : [], "Detectors" : [], "Kits" : []},
    "Accessories" : {"Monitors": [], "Decoders": [], "Harddrives": [], "Workstation": []},
    "Software" : {"Licenses" : []}
  };

  subcatergories = {};
  products = [];
  searchForm = this.formBuilder.group({ term : ''})

  constructor(private router: Router, private actRoute: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    window.addEventListener('storage', this.storageListener)

    let cart = localStorage.getItem('cart');
    cart = '[' +cart+ ']'
    let cartObj;
    if (cart != null){
      cartObj = JSON.parse(cart)
      console.log(Object.keys(cartObj).length)
      this.cartLength = Object.keys(cartObj).length
    }


    this.router.events.subscribe((val) => {

      if( this.mega_menu_display != "none"){
        this.mega_menu_display = "none";
      }

      if( this.mobile_prod_display != "none"){
        this.mobile_prod_display = "none";
      }

      if( this.products_display != "none"){
        this.products_display = "none";
      }

      if( this.mobile_sub_display != "none"){
        this.mobile_sub_display = "none";
      }

    })
  }
  storageListener(){
    let cart = localStorage.getItem('cart');
      cart = '[' +cart+ ']'

      if (cart != null ){
        let cartObj = JSON.parse(cart)
        this.cartLength = Object.keys(cartObj).length
        console.log(this.cartLength)
      }
  }

  // mega menu function
  mega_menu() {

    if (this.mega_menu_display === "none"){
      this.mega_menu_display = "block";
    }

    else{
      this.mega_menu_display = "none"
    }
  }

  // subcatergories function
  subs(catergory:any){
    this.subcatergories = catergory;
    this.products = [];
  }

  //products function
  prods(products:any){
    this.products = products
  }

  search(){
    this.router.navigateByUrl(`search?q=${this.searchForm.value.term}`)
    this.searchForm.reset()
  }

  //re-route to home
  goHome(){
    this.router.navigateByUrl('/')
  }

  getProducts(cat:string){
    this.router.navigateByUrl(`/products/?cat=${cat}`);
  }

  //pop ups function
  show_popup(name:string){

    if (name == "cart"){

      if (this.cart_display == "block"){
        this.cart_display = "none"
      }
      else{
        this.cart_display = "block";
      }

      this.products_display = "none";
      this.search_display = "none";
      this.menu_display = "none";

    }

    else if (name == "menu"){

      if (this.menu_display == "block"){
        this.menu_display = "none"
      }
      else{
        this.menu_display = "block";
      }

      this.cart_display = "none";
      this.products_display = "none";
      this.search_display = "none";

    }

    else if (name == "search"){

      if (this.search_display == "block"){
        this.search_display = "none"
      }
      else{
        this.search_display = "block";
      }

      this.cart_display = "none";
      this.products_display = "none";
      this.menu_display = "none";

    }

    else if (name == "products"){

      if (this.products_display == "block"){
        this.products_display = "none"
      }
      else{
        this.products_display = "block";
      }

      this.cart_display = "none";
      this.search_display = "none";
      this.menu_display = "none";

    }

  }

  //mobile menu products menu

  mobile_subs(subcatergories ? : any){

    if ( subcatergories){
      this.subcatergories = subcatergories;
    }

    if (this.mobile_cart_display == "block"){

      this.mobile_sub_display = "block"
      this.mobile_cart_display = "none";
      this.mobile_prod_display = "none"

    }

    else{

      this.mobile_sub_display = "none"
      this.mobile_cart_display = "block";
      this.mobile_prod_display = "none"

    }

  }

  mobile_prod(products ? : any){

    if ( products){
      this.products = products;
    }

    if (this.mobile_sub_display == "block"){

      this.mobile_sub_display = "none"
      this.mobile_cart_display = "none";
      this.mobile_prod_display = "block"

    }

    else{

      this.mobile_sub_display = "block"
      this.mobile_cart_display = "none";
      this.mobile_prod_display = "none"

    }

  }

}
