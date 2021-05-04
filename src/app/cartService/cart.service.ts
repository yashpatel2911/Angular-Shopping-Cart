import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

// Creating Cart Service
// This Cart Service is used for getting cart details 
export class CartService{
    constructor(){}

    // Product Details
    // Generating Order ID for uniquly identify each order
    items : any[] = [];
    count: number = 0;

    // Adding Product to Cart
    addToCart(product: any): void{
       
        // Inserting ID
        this.count++;
        let item = {...product};
       
        item["id"] = this.count;
        this.items.push(item);
    }

    // Get the Order Details
    getItems(): any{
        return this.items;
    }

    // Removing all the Cart Items
    clearCart(): void{
        this.items = [];
        this.count = 0;
    }

    // Removing Item by ItemID
    removeItem(product: any): void{
        let newCart: any = []

        newCart = this.items.filter(item => {
            return item.id != product.id
        })

        this.items = newCart;
    }

    // Total Price of the Shopping Cart
    getTotalPrice(): number{
        let sum: number = 0;

        this.items.map(
            (item) => {
                let itemPrice = item.price * item.numberOfOrder;
                sum += itemPrice
            }
        )

        return sum;
    }
}