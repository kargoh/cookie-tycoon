import shop from '../json/shop.json';

class Game {
    constructor() {
        // Initialize variables as float types
        this.cookies = parseFloat(localStorage.getItem('cookies') || 0);
        this.orders = JSON.parse(localStorage.getItem('orders') || '{}'); // Default empty object
        this.shop = shop; // Set json object reference
        this.rate = 0; // Auto increment value
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
        var pack = 1;
        var unlimited = this.shop[key].stock == -1; // Boolean

        // Allow shift + click to purchase in bulk
        if ($event.shiftKey == true) {
            pack = Math.floor(this.cookies / item.price);
            if (pack == 0) pack = 1;
        }

        // Check if there are enough cookies
        if (this.cookies >= item.price * pack) {
            stock = (this.orders[key] || 0);

            // Purchase if the shop has inventory (or has unlimited "-1" stock)
            if (stock < this.shop[key].stock || unlimited == true) {
                // Top-off package size (ex: if stock = 18, and shop inventory = 20, then package = 2)
                if (stock + pack > this.shop[key].stock && unlimited == false) pack = this.shop[key].stock - stock;

                // Update cookies and orders
                this.cookies -= item.price * pack; // Subtract price from total
                this.orders[key] = stock + pack; // Increment order stock
                localStorage.setItem('cookies', this.cookies);
                localStorage.setItem('orders', JSON.stringify(this.orders));
                notify('+' + pack + ' purchased', $event);
            }
            else {
                notify('Sold out!', $event);
            }
        }
        else {
            notify('Insufficient funds', $event);
        }
    }
}

export { Game }