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
        var oven = parseInt(this.orders['oven'] || 0) * 2; // +2 for oven
        var bakery = parseInt(this.orders['bakery'] || 0) * 5; // +5 for bakery
        var delivery = parseInt(this.orders['delivery'] || 0) * 10; // +10 for delivery
        var shipment = parseInt(this.orders['shipment'] || 0) * 50; // +50 for shipment
        var amount = oven + bakery + delivery + shipment;

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
        var amount = 1;
        var unlimited = item.stock == -1; // Boolean
        var price = this.getPrice(key, amount);
        var stock = (this.orders[key] || 0);

        // TODO: Find amount from scaled price ... using ... Algebra!
        /* if ($event.shiftKey == true) {
            amount = Math.floor(this.cookies / Math.pow(item.scale, amount + stock));
            if (amount == 0) amount = 1;
        } */

        // Check if there are enough cookies
        if (this.cookies >= price) {
            // Purchase if the shop has inventory (or has unlimited "-1" stock)
            if (stock < item.stock || unlimited == true) {
                // Top-off amount size (ex: if stock = 18, and shop inventory = 20, then amount = 2)
                if (stock + amount > item.stock && unlimited == false) {
                    amount = item.stock - stock;
                }

                // Update cookies and orders
                this.cookies -= price; // Subtract price from total
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

    getPrice(key, amount = 1) {
        var item = this.shop[key];
        var price = item.price;
        var stock = (this.orders[key] || 0);
        var scale = Math.pow(item.scale, amount + stock);

        // Add scale if you have stock in this item
        price = price * amount;
        if (stock != 0) price = price + scale;

        // Return price with scale
        return price;
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