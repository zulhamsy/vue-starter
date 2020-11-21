new Vue({
	el: '#app',
	data() {
		return {
			showAlert: false
		}
	},
	
	computed: {
		buttonText() {
			if(this.showAlert) {
				return 'Close';
			} else {
				return 'Show Me'
			}
		}
	}
});