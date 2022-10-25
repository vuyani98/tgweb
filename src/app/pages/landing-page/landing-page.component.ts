import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from "ngx-spinner";
import { CarouselComponent } from 'angular-responsive-carousel';
import { localizedString } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {

  displayVid = 'None';
  vidLink:any;
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
  one_product_display: string = 'none'


  constructor(private service: PagesService, private router: Router, private sanitizer: DomSanitizer, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getcolorVu();
    this.service.products_using_name('Analogue/Turbo').subscribe(data => {
      let raw_products = data.data[0].attributes.products.data;

      for(let i=0; i<raw_products.length;i++){
        this.products[i] = raw_products[i].attributes
        this.products[i]['id'] = raw_products[i].id
      }
    })

  }

  get_all_products(){
    this.router.navigateByUrl('products?cat=all')
  }

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

  hideVid(){
    this.displayVid = 'None'
  }

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

}
