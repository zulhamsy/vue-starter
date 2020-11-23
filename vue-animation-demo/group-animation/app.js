const app = new Vue({
	el: '#app',
	data() {
		return {
			names: [
				{id: 1, name: 'Shark 46'},
				{id: 2, name: 'Fox 32'},
				{id: 3, name: 'Tiger 7'},
				{id: 4, name: 'Dedsec'},
				{id: 5, name: 'Aiden Pearce'}
				]
		}
	},
	methods: {
		deleteFirst() {
			this.names.shift()
		},
		deleteSingle(index) {
			this.names.splice(index,1)
		}
	}
})