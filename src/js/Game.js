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
    var doubleClick = this.getItemAmount('better-click') * (this.getItemAmount('prestige') + 1);
    var amount = (this.getItemAmount('prestige') + 1) + doubleClick;

    // Update cookies and save
    this.cookies = this.cookies + amount;
    localStorage.setItem('cookies', this.cookies);

    // Return value for notifications
    return amount;
  }

  autoIncrement() {
    // Define automatic modifiers
    var oven = this.getItemAmount('oven');
    var bakery = this.getItemAmount('bakery');
    var delivery = this.getItemAmount('delivery');
    var shipment = this.getItemAmount('shipment');
    var drone = this.getItemAmount('drones');
    var spaceShip = this.getItemAmount('spaceship');
    var moonCookies = this.getItemAmount('moon-cookies');
    var spaceshipEnterprise = this.getItemAmount('spaceship-enterprise');
    var galacticFactory = this.getItemAmount('galactic-factory');
    var amount = oven
    + bakery
    + delivery
    + shipment
    + drone
    + spaceShip
    + moonCookies
    + spaceshipEnterprise
    + galacticFactory;

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

  isPrestigeAvailable() {
    var _this = this;
    var isPrestigable = true;
    var prestigeScale = this.getPrestigeScale();

    // Loop through all shop keys to see if orders are greater than prestige scale
    Object.keys(this.shop).forEach(function(key) {
      if (key != "prestige") {
        var orders = _this.orders[key] || 0;
        if (orders < prestigeScale){
          isPrestigable = false;
        }
      }
    })

    return isPrestigable;
  }

  getPrestigeScale() {
    return this.shop["prestige"].scale;
  }

  getItemAmount(key, index = 0) {
    // Note: "prestige" amount does not scale by "cookie-production"
    var orders = (this.orders[key] || index);
    var itemAmount = (key != "prestige") ? (parseInt(orders) * this.shop[key]['cookie-production']) : orders;
    return itemAmount;
  }

  purchase(key, $event, notify = function(){}, shopAmount) {
    var item = this.shop[key];
    var amount = shopAmount;
    var unlimited = item.stock == -1; // Boolean
    var price = this.getPrice(key, amount);
    var stock = (this.orders[key] || 0);

    if (key == 'prestige') {
      if (this.isPrestigeAvailable() == true) {
        this.cookies = 0;
        this.orders = { prestige: (this.orders['prestige'] || 0) + 1 }

        localStorage.setItem('cookies', this.cookies);
        localStorage.setItem('orders', JSON.stringify(this.orders));
      }
      else {
        notify('Must own ' + this.getPrestigeScale() + ' of all shop items.', $event);
      }
    }
    else {
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
  }

  getPrice(key, amount = 1) {
    var item = this.shop[key];
    var price = item.price;
    var addPrice = 0;
    var stock = (this.orders[key] || 0);

    // Add scale if you have stock in this item
    if (stock != 0 || amount > 1) {
      for(let i = 0; i < (amount); i++) {
        if (i == 0) {
          price = Math.ceil(Math.pow(item.scale, stock + i) * item.price);
        } else {
          addPrice = Math.ceil(Math.pow(item.scale, stock + i) * item.price);
          price = price + addPrice
        }
      }
    }

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

  backupToChrome() {
    var data = {
      cookies: this.cookies,
      orders: JSON.stringify(this.orders)
    };

    // Save data object to Chrome storage and 
    chrome.storage.sync.set(data, function() {
      // Update popup
      dispatchEvent(new CustomEvent('openPopup', {
        detail: {
          text: 'Success!',
          inputs: [
            { value: 'Continue', type: 'button', callback: function() { dispatchEvent(new CustomEvent('closePopup')); }}
          ]
        }
      }));
    });
  }

  restoreFromChrome() {
    var keys = ['orders', 'cookies'];

    // Get specific data from Chrome storage
    chrome.storage.sync.get(keys, function(response) {
      var data = {
        cookies: parseFloat(response['cookies'] || 0),
        orders: JSON.parse(response['orders'] || '{}')
      };
      
      // Update variables from Chrome storage
      this.cookies = data['cookies'];
      this.orders = data['orders']; // Default empty object

      // Save to local storage from Chrome storage
      localStorage.setItem('cookies', data['cookies']);
      localStorage.setItem('orders', JSON.stringify(data['orders']));

      // Update popup
      dispatchEvent(new CustomEvent('openPopup', {
        detail: {
          text: 'Success!',
          inputs: [
            { value: 'Continue', type: 'button', callback: function() { dispatchEvent(new CustomEvent('closePopup')); }}
          ]
        }
      }));
    }.bind(this));
  }

  syncData() {
    // Populate popup with options
    dispatchEvent(new CustomEvent('openPopup', {
      detail: {
        text: 'Sync Data',
        inputs: [
          { type: 'button', value: 'Backup to Google', 
            callback: function() {
              dispatchEvent(new CustomEvent('openPopup', {
                detail: {
                  text: 'Are you sure you want to <em>backup</em> your local data to Google?',
                  inputs: [
                    { value: 'Yes', type: 'button', callback: game.backupToChrome.bind(this) },
                    { type: 'button', value: 'No', callback: this.syncData.bind(this) }
                  ]
                }
              }));
            }.bind(this)
          },
          { type: 'button', value: 'Restore from Google', 
            callback: function() {
              dispatchEvent(new CustomEvent('openPopup', {
                detail: {
                  text: 'Are you sure you want to <em>restore</em> your local data from Google?',
                  inputs: [
                    { value: 'Yes', type: 'button', callback: game.restoreFromChrome.bind(this) },
                    { type: 'button', value: 'No', callback: this.syncData.bind(this) }
                  ]
                }
              }));
            }.bind(this)
          },
          { type: 'button', value: 'Cancel', callback: function() { dispatchEvent(new CustomEvent('closePopup')); }}
        ]
      }
    }));
  }
}

export { Game }