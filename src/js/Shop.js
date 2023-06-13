import shop from '../json/shop.json';

class Shop {
    constructor() {
        this.items = shop;
        this.orders = JSON.parse(localStorage.getItem('orders') || '{}'); // Default empty object
    }

    purchase(action) {
		this.orders[action] = this.items[action];
		localStorage.setItem('orders', JSON.stringify(this.orders));
	}
}

export { Shop }