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
        var biggerClick = parseFloat(this.orders['bigger-click'] || 0) * 0.05; // 5% per stock
        var doubleClick = parseInt(this.orders['double-click'] || 0); // +1 for double click
        var student = parseInt(this.orders['student'] || 0) * 2; // +2 for student
        var professor = parseInt(this.orders['professor'] || 0) * 5; // +5 for professor
        var contentCreator = parseInt(this.orders['content-creator'] || 0) * 10; // +10 for content-creator
        var amount = 1 + biggerClick + doubleClick + student + professor + contentCreator;

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
        var stock = 0;

        // Check if there are enough cookies
        if (this.cookies >= item.price) {
            stock = (this.orders[key] || 0);
            this.cookies -= item.price;
            this.orders[key] = stock + 1; // Increment order stock
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