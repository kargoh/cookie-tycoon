class Game {
    constructor() {
        // Initialize variables as float types
        this.cookies = parseFloat(localStorage.getItem('cookies') || 0); // Fallback
        this.multiplier = parseFloat(localStorage.getItem('rate') || 1); // Fallback
    }

    increment() {
        this.cookies = this.cookies + this.multiplier;
        localStorage.setItem('cookies', this.cookies);
    }

    getCookies() {
        return this.cookies;
    }
}

export { Game }