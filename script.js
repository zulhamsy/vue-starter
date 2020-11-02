Vue.component('button-cta', {
  props: ['quantity', 'addState', 'removeState'],

  computed: {
    qty() {
      if(this.quantity > 0) {
      	return `(${this.quantity})`;
      }
    },
    
    addBtnState() {
    	return !this.addState;
    },
    
    remBtnState() {
    	return !this.removeState;
    }
  },

  methods: {
    addCart(index) {
      this.$emit('add-item');
    },

    removeCart(index) {
      this.$emit('remove-item');
    }
  },

  template: `
	  <div class="btn-wrapper">
			<button class="btn btn-primary" @click="addCart" :disabled="addBtnState">Add to Cart {{ qty }}</button>
	    <button class="btn btn-secondary" @click="removeCart" :disabled="remBtnState">Remove from Cart</button>
	  </div>
	`
});

const app = new Vue({
  el: '#app-wrapper',
  data: {
    index: 0,
    cart: [],
    products: [
      {
        id: 1,
        name: 'Green Forest',
        color: 'green',
        brand: 'Vue Mastery',
        image: './img/socks-green.jpeg',
        stocks: 2,
			},

      {
        id: 2,
        name: 'Brothers in Blue',
        color: 'blue',
        brand: 'Vue School',
        image: './img/socks-blue.jpeg',
        stocks: 7,
			},

      {
        id: 3,
        name: 'The Lavender',
        color: 'purple',
        brand: 'Vuetify',
        image: './img/socks-purple.jpg',
        stocks: 5,
      }
			]
  },

  computed: {
    product() {
      return this.products[this.index].name;
    },

    brand() {
      return this.products[this.index].brand;
    },

    stockName() {
      if (this.products[this.index].stocks < 1) {
        return 'Out of Stock';
      } else {
        return 'Available'
      }
    },
    
    stock() {
    	return this.products[this.index].stocks;
    },

    mycarts() {
      return this.cart.filter(num => num == this.products[this.index].id).length;
    },
    
    isError() {
    	return !this.stock;
    }
  },

  methods: {
    changeProduct(index) {
      this.index = index;
    },

    addCartItem() {
      this.cart.push(this.products[this.index].id);
      this.products[this.index].stocks--
    },

    removeCartItem(index) {
      if (this.cart.lastIndexOf(this.products[this.index].id) != -1) {
        this.cart.splice(this.cart.lastIndexOf(this.products[this.index].id), 1);
      }
      this.products[this.index].stocks++
    }
  }
});