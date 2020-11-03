const reviewProduct = {
	props: ['index', 'reviews'],

  computed: {
    filteredReview() {
      return this.reviews.filter(review => review.id == this.index);
    }
  },
  
  methods: {
  	addReview(item) {
  	  this.reviews.unshift(item);
  	}
  },

  template: `
    <div class="reviews-wrapper">
    	<h3>Product Review</h3>
    	<p v-show="!filteredReview.length">There are no review yet</p>
    	<div v-for="review in filteredReview" class="review">
    		<p class="name">{{ review.name }}</p>
    		<p class="rating">{{ review.rating }} dari 5</p>
    		<p class="desc">{{ review.desc }}</p>
    	</div>
    </div>
	`
};

Vue.component('button-cta', {
  props: ['quantity', 'addState', 'removeState'],

  computed: {
    qty() {
      if (this.quantity > 0) {
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

Vue.component('review-form', {
  props: ['id'],

  data() {
    return {
      name: null,
      desc: null,
      rating: null,
      reviews: null
    }
  },

  methods: {
    submitReview() {
      if (this.name && this.desc && this.rating) {
        this.reviews = {
          id: this.id,
          name: this.name,
          desc: this.desc,
          rating: this.rating
        };
        // reset data
        this.name = null;
        this.desc = null;
        this.rating = null;
        // emit event
        this.$emit('submit-review', this.reviews)
      }
    }
  },

  template: `
    <form class="form-review" accept-charset="utf-8" @submit.prevent="submitReview">
      <!--Name Field-->
      <div class="form-control">
        <label for="name">Name:</label>
        <input v-model="name" type="text" name="name" id="name" autocomplete="off" />
      </div>
      <!--Review Desc-->
      <div class="form-control">
        <label for="review">Review:</label>
        <textarea v-model="desc" wrap="on" cols="30" rows="5" name="review" id="review"></textarea>
      </div>
      <!--Rating-->
      <div class="form-control">
        <label>Rating:</label>
        <div class="inline-radio">
          <span class="radio-wrapper" v-for="n in 5">
            <input v-model.number="rating" type="radio" name="rate" :value="n" :id="n" />
            <label :for="n">{{ n }}</label>
          </span>
        </div>
      </div>
      <!--Submit-->
      <input class="btn btn-sm btn-primary" type="submit" value="Submit Review" />
    </form>
	`
});

const app = new Vue({
  el: '#app-wrapper',
  data: {
    index: 0,
    cart: [],
    reviews: [],
    products: [
      {
        id: 0,
        name: 'Green Forest',
        color: 'green',
        brand: 'Vue Mastery',
        image: './img/socks-green.jpeg',
        stocks: 2,
			},

      {
        id: 1,
        name: 'Brothers in Blue',
        color: 'blue',
        brand: 'Vue School',
        image: './img/socks-blue.jpeg',
        stocks: 7,
			},

      {
        id: 2,
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
    },
    
    addReview(item) {
    	this.reviews.unshift(item);
    }
  },
  
  components: {
  	'product-review': reviewProduct
  }
});