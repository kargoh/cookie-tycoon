import { Shop } from './Shop.js';

class Game {
    constructor() {
        // Initialize variables as float types
        this.cookies = parseFloat(localStorage.getItem('cookies') || 0);
        this.shop = new Shop();
    }

    increment() {
        // Define modifiers
        var doubleClick = parseInt(this.shop.orders['double-click'] ? 1 : 0);

        // Update cookies and save
        this.cookies = this.cookies + 1 + doubleClick;
        localStorage.setItem('cookies', this.cookies);
    }

    getCookies() {
        return this.cookies;
    }

    purchaseFromShop(action) {
        var item = this.getItemFromShop(action);

        // Check if there are enough cookies
        if (this.cookies >= item.cost) {
            this.cookies -= item.cost;
            this.shop.purchase(action);
            localStorage.setItem('cookies', this.cookies);

            // TODO: Add notification showing purchase
			console.log(item['name'] + ' purchased');
        }
        else {
            // TODO: Add notification showing insufficient funds
			console.log('Insufficient funds')
        }
    }

    getItemFromShop(key) {
        return this.shop.items[key];
    }

    getOrderFromShop(key) {
        return this.shop.orders[key];
    }
}

export { Game }