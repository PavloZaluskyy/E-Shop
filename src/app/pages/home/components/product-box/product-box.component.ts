import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/product.module';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() product: Product;
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<Product>();
  // product: Product | undefined = {
  //     id: 1,
  //     title: "Title",
  //     price: 150,
  //     category: "sports",
  //     description: "sdfsdfsdnfjsdbfmbsdf",
  //     image: "https://via.placeholder.com/600/92c952"
  // }

  constructor() {}

  onAddToCart(): void{
    this.addToCart.emit(this.product);
  }

}
