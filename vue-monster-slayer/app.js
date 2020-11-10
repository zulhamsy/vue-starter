new Vue({
  el: '#app',

  data() {
    return {
      gameMode: false,
      gameLog: [],
      stats: {
      	player: {
      		health: 90,
      		baseAtk: 4,
      		critAtk: 10,
      		specialAtk: 6,
      		specialCount: 5,
      		healCount: 3
      	},
      	
      	monster: {
      		health: 100,
      		baseAtk: 5,
      		critAtk: 12,
      	}
      }
    }
  },
  
  computed: {
  	playerHealth: {
  		get: function() {
  			return this.stats.player.health;
  		},
  		
  		set: function(value) {
  			this.stats.player.health = value;
  		}
  	},
  	
  	specialCounter: {
  		get: function() {
  			return this.stats.player.specialCount;
  		},
  		
  		set: function(value) {
  			this.stats.player.specialCount = value;
  		}
  	},
  	
  	healCounter: {
  		get: function() {
  			return this.stats.player.healCount;
  		},
  		
  		set: function(value) {
  			return this.stats.player.healCount = value;
  		}
  	},
  	
  	playerBaseAtk() {
  		return this.stats.player.baseAtk;
  	},
  	
  	playerCritAtk() {
  		return this.stats.player.critAtk;
  	},
  	
  	playerSpecialAtk() {
  		return this.stats.player.specialAtk;
  	},
  	
  	monsterHealth: {
  		get: function() {
  			return this.stats.monster.health;
  		},
  		
  		set: function(value) {
  			this.stats.monster.health = value;
  		}
  	},
  	
  	monsterBaseAtk() {
  		return this.stats.monster.baseAtk;
  	},
  	
  	monsterCritAtk() {
  		return this.stats.monster.critAtk;
  	}
  },

  methods: {
    startGame() {
      this.gameMode = true;
      // set to default
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.specialCounter = 5;
    },

    giveUp() {
      // set to gameMode false
      this.gameMode = false;
    },

    attack() {
      // reduce player HP
      this.playerHealth -= this._calcDamage(this.monsterBaseAtk, this.monsterCritAtk);
      // reduce monster HP
      this.monsterHealth -= this._calcDamage(this.playerBaseAtk, this.playerCritAtk);
    },

    specialAttack() {
    	// reduce counter
    	this.specialCounter--;
      // reduce player HP
      this.playerHealth -= this._calcDamage(this.monsterBaseAtk, this.monsterCritAtk);
      // reduce monster HP
      this.monsterHealth -= this._calcDamage(this.playerSpecialAtk, this.playerCritAtk);
    },
    
    heal() {
    	// reduce heal counter
    	this.healCounter--
    	// increase player HP
    	this.playerHealth += this._calcDamage(this.playerSpecialAtk, this.playerCritAtk);
    },

    _calcDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max), min);
    },

    _checkWin(hp) {
      if (hp <= 0) {
        // game over
        this.gameMode = false;
      }
    },

    _addLog(n, o, user, id) {
      this.gameLog.unshift(
      	{
      		id,
      		msg: `${user} hit, get ${o - n} damage`
      	}
      	);
    },

    _resetLog() {
      this.gameLog = [];
    }
  },

  watch: {
    playerHealth(NewHP, OldHP) {
      // check HP
      this._checkWin(NewHP);
      // add item to log
      this._addLog(NewHP, OldHP, "Player", 0);
    },

    monsterHealth(NewHP, OldHP) {
      // check HP
      this._checkWin(NewHP);
      // add item to log
      this._addLog(NewHP, OldHP, "Monster", 1);
    },

    gameMode(New, Old) {
      if (New) this._resetLog();
    }
  }
})