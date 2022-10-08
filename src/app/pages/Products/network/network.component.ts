import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.sass']
})
export class NetworkComponent implements OnInit {

  products: any=[];
  one_product = {
    image_url: '',
    product_code: '',
    price: '',
    description:'',
    supplier_code: ''
  }
  one_product_display: string = 'none'

  constructor( private service: PagesService) { }

  ngOnInit(): void {
    this.service.products_using_name('Network').subscribe(data => {
      this.products = data.data[0].attributes.products.data;
    });
  }

  show_subCatergory(sub:string){
    this.service.products_using_name(sub).subscribe(data => {
      let raw_products = data.data[0].attributes.products.data;
      this.products = []

      for(let i=0; i<raw_products.length;i++){
        this.products[i] = raw_products[i].attributes
        this.products[i]['id'] = raw_products[i].id
      }
    });
  }

  show_one(id:number){

    for (let i=0; i<this.products.length; i++){

      if(id==this.products[i].id){
        console.log(`${this.products[i]['product_code']}`)
        this.one_product['image_url'] = this.products[i]['image_url'];
        this.one_product['description'] = this.products[i]['description'];
        this.one_product['product_code'] = this.products[i]['product_code'];
        this.one_product['supplier_code'] = this.products[i]['supplier_code'];
        this.one_product['price'] = this.products[i]['retail_price'];

        this.one_product_display = 'flex'

        break;
      }

    }



  }

  close_prod(){
    this.one_product_display = 'none'
  }

  addtocart(product:any){
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
    x?.close();
  }

}

