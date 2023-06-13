import shop from '../json/shop.json';

class Game {
    constructor() {
        // Initialize variables as float types
        this.cookies = parseFloat(localStorage.getItem('cookies') || 0);
        this.orders = JSON.parse(localStorage.getItem('orders') || '{}'); // Default empty object
        this.shop = shop; // Set json object reference
    }

    increment() {
        // Define modifiers
        var doubleClick = parseInt(this.orders['double-click'] ? 1 : 0);

        // Update cookies and save
        this.cookies = this.cookies + 1 + doubleClick;
        localStorage.setItem('cookies', this.cookies);
    }

    getCookies() {
        return this.cookies;
    }

    purchase(key) {
        var item = this.shop[key];

        // Check if there are enough cookies
        if (this.cookies >= item.cost) {
            this.cookies -= item.cost;
            this.orders[key] = this.shop[key];
            localStorage.setItem('cookies', this.cookies);
            localStorage.setItem('orders', JSON.stringify(this.orders));

            // TODO: Add notification showing purchase
            console.log(item['name'] + ' purchased');
        }
        else {
            // TODO: Add notification showing insufficient funds
            console.log('Insufficient funds')
        }
    }
}

export { Game }