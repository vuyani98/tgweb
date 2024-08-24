
import { HostListener, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

   header:string = '';
   products: any = [];
   catergories: any
   one_product = {
     image_url: '',
     product_code: '',
     price: '',
     description:'',
     supplier_code: ''
   }
   one_product_display: string = 'none';



  constructor(private router: Router, private actRoute: ActivatedRoute, private service : PagesService) { }

  ngOnInit(): void {
    console.log('on it')
    this.router.events.subscribe(evnt => {
      this.products= []
    })
    this.actRoute.queryParams.subscribe(params => {
      this.header = params['cat'];

      if (this.header == 'all'){
        this.header = 'All'
        this.get_all()
      }

      else if(this.header == 'Alarm')[
        this.header = 'Ax Pro'
      ]

      else{
        this.get_products()
      }

    })
  }

  @HostListener('window:beforeunload')
  onrefresh(){
    console.log('RELOAD')
    window.addEventListener('load', () => {
      console.log('after unload')
    })
  }

  get_products(){

    this.service.catergories_using_contains(this.header).subscribe(data => {
      let raw_products = data.data[0].attributes.products.data;
      console.log(data)
      if (this.header == 'PTZ'){
        for (let i=0; i<data.data.length; i++){
          let raw_ptz= data.data[i].attributes.products.data;
          for (let j=0; j<raw_ptz.length; j++){
            this.products[j] = raw_ptz[j].attributes
            this.products[j]['id'] = raw_ptz[j].id
          }
        }
      }
      else{
        for(let i=0; i<raw_products.length;i++){
          this.products[i] = raw_products[i].attributes
          this.products[i]['id'] = raw_products[i].id
        }
      }
    })
  }

  get_all(){
    this.service.all_products().subscribe(data => {
      console.log(data)

      for(let i=0; i<data.data.length;i++){
        this.products[i] = data.data[i].attributes
        this.products[i]['id'] = data.data[i].id
      }
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
