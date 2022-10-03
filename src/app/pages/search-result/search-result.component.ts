import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent implements OnInit {

  header:string = '';
  products: any[] = [];
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
      this.header = params['q'];
      this.service.products_using_contains(this.header).subscribe(data => {
        console.log(data)
        for(let i=0; i<data.data.length;i++){
          this.products[i] = data.data[i].attributes
          this.products[i]['id'] = data.data[i].id
        }
      })
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
