import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition, keyframes, query, stagger, group } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  animations: [
                  // arrow rotation animation
                  trigger('rotate', [

                    state('open', style({ transform: 'rotate(-180deg)'})),
                    state('closed', style({ transform: 'rotate(0deg)'})),

                    transition('closed => open', [
                      animate('500ms ease-out', keyframes([
                        style({ transform: 'rotate(0deg)', offset: 0}),
                        style({ transform: 'rotate(-90deg)', offset: 0.5}),
                        style({ transform: 'rotate(-180deg)', offset: 1}),
                      ])),

                    ]),

                    transition('open => closed', [
                      animate('200ms ease-in', keyframes([
                        style({ transform: 'rotate(-180deg)', offset: 0}),
                        style({ transform: 'rotate(-90deg)', offset: 0.5}),
                        style({ transform: 'rotate(0deg)', offset: 1}),
                      ]))
                    ]),


                  ]),

                  //animating mega menu items
                  trigger('slideDown', [

                    //..
                    state('open', style({ display : 'block'})),
                    state('closed', style({ display : 'none'})),

                    transition('closed => open', [
                      style({ display : 'block'}),
                      query('.item', [
                        style({ opacity : 0}),
                        animate('500ms ease-out', keyframes([
                          style({ transform : 'translateY(-15px)', opacity : 0, offset: 0 }),
                          style({ transform : 'translateY(-7px)', opacity : 0.5, offset: 0.5 }),
                          style({ transform : 'translateY(0px)', opacity : 1 , offset: 1 }),
                        ])),
                      ], ({ optional : true })),
                    ]),

                    transition('open => closed', [
                      style({ display : 'block'}),
                      query('.item', [
                        animate('500ms ease-in', keyframes([
                          style({ transform : 'translateY(0px)', opacity : 1, offset: 0 }),
                          style({ transform : 'translateY(-7px)', opacity : 0.5, offset: 0.5 }),
                          style({ transform : 'translateY(-15px)', opacity : 0, offset: 1 }),
                        ])),
                      ], ({ optional : true })),
                    ]),

                  ]),

                  //animating mobile burger menu

                  trigger('cross', [

                    transition('straight => crossed', [

                      group([
                        query('#center-line', [

                          animate('400ms ease-out', keyframes([
                            style({ opacity : 1, offset: 0}),
                            style({ opacity : 0, offset: 1}),
                          ]))

                        ], { optional : true }),

                        query('#top-line', [
                          animate('400ms ease-out', keyframes([
                            style({ transform: 'translateY(0px)', offset: 0}),
                            style({ transform: 'translateY(7px)', offset: 0.5}),
                            style({ transform: 'translate(0px, 7px) rotate(-45deg)', offset: 1})
                          ]))
                        ], { optional : true }),

                        query('#bottom-line', [
                          animate('400ms ease-out', keyframes([
                            style({ transform: 'translateY(0px)', offset: 0}),
                            style({ transform: 'translateY(-7px)', offset: 0.5}),
                            style({ transform: 'translate(0px, -7px) rotate(45deg)', offset: 1})
                          ]))
                        ], { optional : true }),

                        query('.menu-items', [
                          style({ opacity : 0}),
                          animate('400ms ease-out', keyframes([
                            style({ transform : 'translateY(-15px)', opacity : 0, offset: 0 }),
                            style({ transform : 'translateY(-7px)', opacity : 0.5, offset: 0.5 }),
                            style({ transform : 'translateY(0px)', opacity : 1 , offset: 1 }),
                          ])),
                        ], ({ optional : true })),
                      ])

                    ]),

                    transition('crossed => straight', [

                      group([
                        query('#center-line', [
                          animate('400ms ease-out', keyframes([
                            style({ opacity : 0, offset: 0}),
                            style({ opacity : 1, offset: 1}),
                          ]))
                        ], { optional : true }),

                        query('#top-line', [
                          animate('400ms ease-out', keyframes([
                            style({ transform: 'translateY(7px)', offset: 0}),
                            style({ transform: 'rotate(0deg)', offset: 0.5}),
                            style({ transform: 'translate(0px, 0px) rotate(0deg)', offset: 1})
                          ]))
                        ], { optional : true }),

                        query('#bottom-line', [
                          animate('400ms ease-out', keyframes([
                            style({ transform: 'translateY(-7px)', offset: 0}),
                            style({ transform: 'rotate(0deg)', offset: 0.5}),
                            style({ transform: 'translate(0px, 0px) rotate(0deg)', offset: 1})
                          ]))
                        ], { optional : true }),
                      ])

                    ]),

                  ])

  ]
})
export class HeaderComponent implements OnInit {

  top_line_style = "translate(0px, 0px) rotate(0deg)";
  center_line_style = 1;
  bottom_line_style = "translate(0px, 0px) rotate(0deg)";
  isOpen = false;
  isMobileOpen = false;
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

    window.addEventListener('storage', () => {
      console.log('changes')
      let cart = localStorage.getItem('cart');
        cart = '[' +cart+ ']'

        if (cart != null ){
          let cartObj = JSON.parse(cart)
          this.cartLength = Object.keys(cartObj).length
          console.log(this.cartLength)
        }
    })

    let cart = localStorage.getItem('cart');
    cart = '[' +cart+ ']'
    let cartObj;
    if (cart != null){
      cartObj = JSON.parse(cart)
      console.log(Object.keys(cartObj).length)
      this.cartLength = Object.keys(cartObj).length
    }


    this.router.events.subscribe((val) => {

      this.isOpen = false;
      this.isMobileOpen = false;
      this.top_line_style = "translate(0px, 0px) rotate(0deg)";
      this.center_line_style = 1;
      this.bottom_line_style = "translate(0px, 0px) rotate(0deg)";

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

      if (this.menu_display != "none"){
        this.menu_display = "none"
      }

    })
  }

  //function
  storageListener(){
    console.log('changes')
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
      this.isOpen = true
    }

    else{
      this.mega_menu_display = "none"
      this.isOpen = false
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

  // search function
  search(){
    this.router.navigateByUrl(`search?q=${this.searchForm.value.term}`)
    this.searchForm.reset()
  }

  //re-route to home
  goHome(){
    this.router.navigateByUrl('/')
  }

  // function
  getProducts(cat:string){
    this.router.navigateByUrl(`/products?cat=${cat}`);
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
        this.isMobileOpen = false;
        this.top_line_style = "translate(0px, 0px) rotate(0deg)";
        this.center_line_style = 1;
        this.bottom_line_style = "translate(0px, 0px) rotate(0deg)";
      }

      else{
        this.menu_display = "block";
        this.isMobileOpen = true;
        this.top_line_style = "translate(0px, 7px) rotate(-45deg)";
        this.center_line_style = 0;
        this.bottom_line_style = "translate(0px, -7px) rotate(45deg)";
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
        this.isOpen = false
      }
      else{
        this.products_display = "block";
        this.isOpen = true
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

  // function
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
