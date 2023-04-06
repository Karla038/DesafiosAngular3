import { Component, Input } from '@angular/core';
import { Product, products, CartProduct } from '../products';
import { CartService } from '../cart.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [MessageService],
})
export class ProductComponent {
  @Input() product!: Product;

  display: boolean = false;
  showDialog() {
    this.display = true;
  }

  productos = this.cartService.getItems();

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  addToCart(product: Product) {
    let producto = this.productos.find((p) => p.id === product.id);
    if (!producto) {
      console.log('Agregando producto ' + JSON.stringify(product));
      let p = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        quantity: 1,
      };
      this.cartService.addToCart(p);
    } else {
      producto.quantity++;
      this.cartService.setTotal(this.cartService.getTotal() + producto.price);
    }
  }

  share() {
    window.alert('The product has been shared!');
  }

  onNotify() {
    window.alert('You will be notified when the product goes on sale');
  }
}
