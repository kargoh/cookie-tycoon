import shop from '../json/shop.json';

class Game {
    constructor() {
        // Initialize variables as float types
        this.cookies = parseFloat(localStorage.getItem('cookies') || 0);
        this.orders = JSON.parse(localStorage.getItem('orders') || '{}'); // Default empty object
        this.shop = shop; // Set json object reference
    }

    increment() {
        // TODO: Add more shop item conditions like doubleClick

        // Define modifiers
        var doubleClick = parseInt(this.orders['double-click'] ? 1 : 0); // Default 0
        var tripleClick = parseInt(this.orders['triple-click'] ? 2 : 0); // Default 0
        var amount = 1 + doubleClick + tripleClick;


        // Update cookies and save
        this.cookies = this.cookies + amount;
        localStorage.setItem('cookies', this.cookies);

        // Return value for notifications
        return amount;
    }

    getCookies() {
        return this.cookies;
    }

    purchase(key, $event, notify = function(){}) {
        var item = this.shop[key];

        // Check if there are enough cookies
        if (this.cookies >= item.price) {
            this.cookies -= item.price;
            this.orders[key] = this.shop[key];
            localStorage.setItem('cookies', this.cookies);
            localStorage.setItem('orders', JSON.stringify(this.orders));
            notify(item['name'] + ' purchased', $event);
        }
        else {
            notify('Insufficient funds', $event);
        }
    }
}

export { Game }