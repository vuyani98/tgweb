import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

   header:string = '';
   products: any;
   catergories: any
   one_product = {
     image_url: '',
     product_code: '',
     price: '',
     description:'',
     supplier_code: ''
   }
   one_product_display: string = 'none'

  constructor(private router: Router, private actRoute: ActivatedRoute, private service : PagesService) { }

  ngOnInit(): void {
    this.actRoute.queryParams.subscribe(params => {
      this.header = params['cat'];

      if (this.header == 'all'){
        this.header = 'All'
        this.get_all()
      }

      else{
        this.get_products()
      }

    })
  }

  get_products(){

    this.service.catergories_using_contains(this.header).subscribe(data => {

      if (this.header == 'PTZ'){
        this.products = data[1].products;
        this.products.push(data[0].products);
      }
      else{
       this.products = data[0].products;
      }
    })
  }

  get_all(){
    this.service.all_products().subscribe(data => {
      this.products = data
      console.log(data)
    })
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
