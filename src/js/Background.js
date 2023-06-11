class Background {
    constructor() {
        this.cookies = [];
    }

    addCookie() {
        var time = 1000; // ms
        var cookie = {
            style: 'left: ' + (Math.random() * 100) + '%; animation: rainDown ' + (time / 1000) + 's ease-in; animation-fill-mode: forwards;'
        };

        // Add cookie to array
        this.cookies.push(cookie);

        // Add timer to remove cookie
        var _this = this;
        setTimeout(function() {
            _this.removeCookie(cookie);
        }, time);
    }

    removeCookie(cookie) {
        var index = this.cookies.indexOf(cookie);
        if (index !== -1) {
            this.cookies.splice(index, 1);
        }
    }
}

export { Background }