import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { ChooseCriterionProduct, Product, Rating } from '../models/product.module';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../models/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  id: number = 0;
  sub: Subscription = new Subscription();
  product: Product; 
  quantity: number = 1;
  proposedProducts: Product[] | undefined;
  proposedFilter: any = [
    {view: 'Products of the same category', value: 'same'},
    {view: 'Products you recently viewed', value: 'viewed'}
  ];
  selectedSize: ChooseCriterionProduct[];
  selectedColor: ChooseCriterionProduct[] = [];
  selected: string = 'same';
  chooseDetail: string[] = [];
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private _cartService: CartService) {}

  ngOnInit(): void {
    console.log("onInit");
    
    
    this.sub = this.route.params.pipe(
      switchMap(params => {
        this.id = +params['id'];
        return this.productsService.getProductById(this.id)}),
      switchMap(data => {
        this.product = data;
        this.selectedColor = [];
        this.selectedSize = [];
        console.log(this.product);
        this.product.rating.count = this.product.rating.count;
        data.size?.map(item => this.selectedSize.push({name: item, isSelected: false}))
      //  this.selectedSize = data.size?.map((item: string): ChooseCriterionProduct => {return {name: item, isSelected: false}})
       
       
        data.colors?.map(item => this.selectedColor.push({name: item, isSelected: false}))
      return this.productsService.getProductsByCategory(data.category, 4)
      })
    ).subscribe(data => {
     console.log(data);
     this.proposedProducts = data;
     
   });
  }

  onConvertationData(){
    return {
      product: this.product?.description,
      name: this.product?.title,
      price: this.product?.price,
      quantity: this.quantity,
      id: this.product?.id
    }
  }

  onRemoveQuantity(product: any){

    // this._cartService.onRemoveQuantity({
    //   product: product.image,
    //   name: product.title,
    //   price: product.price,
    //   quantity: this.quantity,
    //   id: product.id,
    // })
    this.quantity--;
  }

  onAddToCart(product: any) {
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: this.quantity,
      id: product.id,
      chooseDetail: this.chooseDetail
    })
  }
  onChooseSize(size: {name: string, isSelected: boolean}){
    console.log(this.selectedSize);
    console.log(size);
    this.selectedSize.map(item => {
      if (item.isSelected) {
        item.isSelected = !item.isSelected;
      }
    })
    size.isSelected = !size.isSelected;
    this.chooseDetail[0] = size.name;
  }

  onChooseColor(color: {name: string, isSelected: boolean}){
    
    console.log(color);
    this.selectedColor.map(item => {
      if (item.isSelected) {
        item.isSelected = !item.isSelected;
      }
    })
    color.isSelected = !color.isSelected;
    console.log(this.selectedColor);
    this.chooseDetail[1] = color.name;
  }

  onAddQuantity(product: any, event: any){
    // this._cartService.addToCart({
    //   product: product.image,
    //   name: product.title,
    //   price: product.price,
    //   quantity: this.quantity,
    //   id: product.id,
    // })
    this.quantity++;
  }
  ngOnDestroy(): void {
   
  }
}
