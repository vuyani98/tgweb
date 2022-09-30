import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  one_product_display: string = 'none'

  constructor(private service: PagesService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getcolorVu()
  }

  get_all_products(){
    this.router.navigateByUrl('products/?cat=all')
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
    console.log(this.vidLink)

  }

  hideVid(){
    this.displayVid = 'None'
  }

  getcolorVu(){
    this.service.products_using_name('ColorVu').subscribe(data => {
      this.colorProducts.push(data[0].products[2]);
      this.colorProducts.push(data[0].products[4]);
      this.colorProducts.push(data[0].products[7]);
      console.log(this.colorProducts)
    })
  }

  getProducts(cat:string){
    this.router.navigateByUrl(`/products/?cat=${cat}`);
  }

  show_one(id:number){

    for (let i=0; i<this.colorProducts.length; i++){

      if(id==this.colorProducts[i].id){
        console.log(`${this.colorProducts[i]['product_code']}`)
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


}
