Vue.component('com-question', {
  template: `
	<div>
		<p>What is {{ operandOne }} + {{ operandTwo }}</p>
    <p>Result is {{ theAnswer }}</p>
    <p>Options {{ arrayOfOptions }}</p>
    <ul>
    	<li v-for="option in arrayOfOptions" @click="showResult(option)" style="padding: 1rem">{{ option }}</li>
    </ul>
    <p>Your choice : {{ result }}</p>
	</div>
	`,

  data() {
    return {
      minOperand: 1,
      maxOperand: 100,
      options: 4,
      state: true,
      result: ''
    }
  },

  computed: {
    operandOne() {
      return this.generateRandomOperand(this.minOperand, this.maxOperand);
    },

    operandTwo() {
      return this.generateRandomOperand(this.minOperand, this.maxOperand);
    },

    theAnswer() {
      return this.operandOne + this.operandTwo;
    },

    arrayOfOptions() {
      let options = this.generateArrayOptions();
      options.splice(this.answerOnOption, 1, this.theAnswer);
      return options;
    },

    answerOnOption() {
      return Math.floor(Math.random() * this.options);
    }
  },

  methods: {
    generateRandomOperand(min, max) {
      return Math.max(Math.floor(Math.random() * max), min)
    },

    generateArrayOptions() {
      return Array.from({ length: this.options }, () => Math.max(Math.floor(Math.random() * this.theAnswer), Math.floor(Math.random() * 100)));
    },

    showResult(option) {
      if (option == this.theAnswer) {
        this.result = 'Jawaban Benar';
      } else {
        this.result = 'Jawaban Salah';
      }
    }
  }
});

Vue.component('com-answer', {
	template: `<h1>Just Answer</h1>`
})

new Vue({
  el: '#app',
  data() {
  	return {
  		currentCom: 'com-answer'
  	}
  },
  methods: {
  	changeCom() {
  		if(this.currentCom == 'com-answer') {
  			this.currentCom = 'com-question';
  		} else {
  			this.currentCom = 'com-answer';
  		}
  	}
  }
})