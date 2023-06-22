import shop from '../json/shop.json';

class Game {
    constructor() {
        // Initialize variables as float types
        this.cookies = parseFloat(localStorage.getItem('cookies') || 0);
        this.orders = JSON.parse(localStorage.getItem('orders') || '{}'); // Default empty object
        this.shop = shop; // Set json object reference
        this.rate = 0; // Auto increment value
        this.checkURL();
    }

    increment() {
        // Define singular modifiers
        var biggerClick = parseFloat(this.orders['bigger-click'] || 0) * 0.05; // 5% per stock
        var doubleClick = parseInt(this.orders['double-click'] || 0); // +1 for double click
        var amount = 1 + biggerClick + doubleClick;

        // Update cookies and save
        this.cookies = this.cookies + amount;
        localStorage.setItem('cookies', this.cookies);

        // Return value for notifications
        return amount;
    }

    autoIncrement() {
        // Define automatic modifiers
        var student = parseInt(this.orders['student'] || 0) * 2; // +2 for student
        var professor = parseInt(this.orders['professor'] || 0) * 5; // +5 for professor
        var contentCreator = parseInt(this.orders['janitor'] || 0) * 10; // +10 for janitor
        var amount = student + professor + contentCreator;

        // Update cookies and save
        this.cookies = this.cookies + amount;
        this.rate = amount; // Update for Vue label
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
        var amount = 1;
        var unlimited = this.shop[key].stock == -1; // Boolean

        // Allow shift + click to purchase in bulk
        if ($event.shiftKey == true) {
            amount = Math.floor(this.cookies / item.price);
            if (amount == 0) amount = 1;
        }

        // Check if there are enough cookies
        if (this.cookies >= item.price * amount) {
            stock = (this.orders[key] || 0);

            // Purchase if the shop has inventory (or has unlimited "-1" stock)
            if (stock < this.shop[key].stock || unlimited == true) {
                // Top-off amount size (ex: if stock = 18, and shop inventory = 20, then amount = 2)
                if (stock + amount > this.shop[key].stock && unlimited == false) {
                    amount = this.shop[key].stock - stock;
                }

                // Update cookies and orders
                this.cookies -= item.price * amount; // Subtract price from total
                this.orders[key] = stock + amount; // Increment order stock

                // Store cookies/orders in localStorage
                localStorage.setItem('cookies', this.cookies);
                localStorage.setItem('orders', JSON.stringify(this.orders));
                notify('+' + amount.toLocaleString() + ' purchased', $event);
            }
            else {
                notify('Sold out!', $event);
            }
        }
        else {
            notify('Insufficient funds', $event);
        }
    }

    checkURL() {
        var url = location.href;

        // Clear localStorage if reset parameter exists
        if (url.includes('reset=true')) {
            localStorage.clear();
            location.href = location.protocol + '//' + location.host + location.pathname; // Redirect
        }
    }
}

export { Game }