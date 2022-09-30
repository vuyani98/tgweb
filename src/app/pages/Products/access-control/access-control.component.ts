import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../pages.service';


@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.sass']
})
export class AccessControlComponent implements OnInit {

  products: any;
  one_product = {
    image_url: '',
    product_code: '',
    price: '',
    description:'',
    supplier_code: ''
  };
  one_product_display: string = 'none'


  constructor(private service: PagesService) {}

  ngOnInit(): void {
    this.service.products_using_name('Access Control').subscribe(data => {
      console.log(data)
      this.products = data.data;
      console.log(this.products)
    });
  }

  show_subCatergory(sub:string){
    console.log('called')
    this.service.products_using_contains(sub).subscribe(data => {
      this.products = data;
      console.log(this.products)
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


}
