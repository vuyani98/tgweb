import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { CarouselComponent } from 'angular-responsive-carousel';
import { trigger, state, style, animate, transition, keyframes, query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass'],
  animations: [
                  trigger('Slide', [

                    //...
                    state('hidden', style({display : 'none'})),
                    state('shown', style({display: 'block'})),

                    transition('shown => hidden', [
                        animate('1000ms ease-out', keyframes([
                          style({ opacity: 1, offset: 0}),
                          style({ opacity: 0.95, offset: 0.5}),
                          style({ opacity: 0.9, offset: 1}),
                        ])),

                        query('.content', [
                          animate('200ms 800ms ease-out', keyframes([
                            style({ opacity: 0.6, offset: 0.1 }),
                            style({ opacity: 0.4, offset: 0.6 }),
                            style({ opacity: 0, offset: 1 }),
                          ]))
                        ], { optional: true}),

                        query('.wheel', [
                          animate('600ms 400ms ease-out', keyframes([
                            style({ transform: 'rotate(0deg)', offset: 0}),
                            style({ transform: 'rotate(15deg)', offset: 0.5}),
                            style({ transform: 'rotate(30deg)', offset: 1})
                          ]))
                        ], { optional: true})
                    ]),

                    transition('hidden => shown', [
                      animate('1000ms ease-in', keyframes([
                        style({display: 'block', opacity: 0.8, offset: 0.1}),
                        style({ opacity: 0.9, offset: 0.7}),
                        style({ opacity: 1, offset: 1}),
                      ])),

                      query('.content',[
                        animate('1000ms ease-in', keyframes([
                          style({ display: 'block', opacity: 0.4, offset: 0.1}),
                          style({ opacity: 0.7, offset: 0.6}),
                          style({ opacity: 1, offset: 1}),
                        ]))
                      ]),
                    ]),

                  ]),
  ]
})
export class LandingPageComponent implements OnInit {

  slide1 = true;
  slide2 = false;
  slide3 = false;
  displayVid = 'None';
  vidLink:any;
  lat = '-26.137823581467845';
  long = '28.25777963406091'
  colorvu = 'https://www.youtube.com/embed/sn_DFZJCc7U';
  acusense = 'https://www.youtube.com/embed/7nbch_TQEA0';
  axpro = 'https://www.youtube.com/embed/OeGQDqtzrz8';
  colorProducts:any = [];
  one_product = {
    image_url: '',
    product_code: '',
    price: '',
    description:'',
    supplier_code: ''
  };
  products: any[] = [];
  one_product_display: string = 'none';
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: {lat: -26.137823581467845, lng: 28.25777963406091},
    zoom: 4
  };

  constructor(private httpClient : HttpClient ,private service: PagesService, private router: Router, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService) {
    console.log('calling api')
    this.apiLoaded = this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAyVnWI_YYyNKOgU9Wt2_WCW6GoJjNqfT0', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  ngOnInit(): void {

    setInterval( () => this.slideshow(), 4500)
    this.getcolorVu();
    this.service.products_using_name('Analogue/Turbo').subscribe(data => {
      let raw_products = data.data[0].attributes.products.data;

      for(let i=0; i<raw_products.length;i++){
        this.products[i] = raw_products[i].attributes
        this.products[i]['id'] = raw_products[i].id
      }
    })

  }

  //function
  slideshow(){

    if (this.slide1 == true){
      this.slide2 = true;
      this.slide1= false;
      this.slide3 = false;

    }

    else if (this.slide2 == true){
      this.slide3 = true;
      this.slide1 = false;
      this.slide2 = false
    }

    else {
      this.slide1 = true;
      this.slide2 = false;
      this.slide3 = false

    }


  }

  //function
  get_all_products(){
    this.router.navigateByUrl('products?cat=all')
  }

  //function
  showVid(tech:string){

    if (tech == 'colorvu'){
      this.vidLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.colorvu);
    }

    else if (tech=='acusense'){
      this.vidLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.acusense);
    }

    else{
      this.vidLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.axpro);
    }

    this.displayVid = 'block'

  }

  //function
  hideVid(){
    this.displayVid = 'None'
  }

  //function
  getcolorVu(){
    this.service.products_using_name('ColorVu').subscribe(data => {
      let raw_products = data.data[0].attributes.products.data;

      this.colorProducts[0] = raw_products[2].attributes;
      this.colorProducts[0]['id'] = raw_products[2].id

      this.colorProducts[1] = raw_products[4].attributes;
      this.colorProducts[1]['id'] = raw_products[4].id;

      this.colorProducts[2] = raw_products[7].attributes;
      this.colorProducts[2]['id'] = raw_products[7].id;
    })
  }

  //function
  getProducts(cat:string){
    this.router.navigateByUrl(`/products?cat=${cat}`);
  }

  show_one(id:number){

    for (let i=0; i<this.colorProducts.length; i++){

      if(id==this.colorProducts[i].id){
        this.one_product['image_url'] = this.colorProducts[i]['image_url'];
        this.one_product['description'] = this.colorProducts[i]['description'];
        this.one_product['product_code'] = this.colorProducts[i]['product_code'];
        this.one_product['supplier_code'] = this.colorProducts[i]['supplier_code'];
        this.one_product['price'] = this.colorProducts[i]['retail_price'];

        this.one_product_display = 'flex'

        break;
      }
    }
  }

  close_prod(){
    this.one_product_display = 'none'
  }

  async addtocart(product:any){
    let cartlist = localStorage.getItem('cart');
    let newItem = JSON.stringify(product);

    if(cartlist==''){
      cartlist = cartlist+newItem;
    }
    else{
      cartlist = cartlist+','+newItem;
    }
    let x = window.open("", "myWindow", "width=1,height=1");
    x?.localStorage.setItem('cart', cartlist);
    await x?.close();
    alert(`${product.product_code} added to cart`)
  }

  checkout(){
    let cart = localStorage.getItem('cart');

    if (cart == ''){
      alert('Cart is empty')
    }

    else{
      this.router.navigateByUrl('/cart');
    }
  }

  //function
  directions(){
    document.getElementById('googleMap')?.scrollIntoView();
  }

}
