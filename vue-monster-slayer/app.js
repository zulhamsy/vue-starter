new Vue({
  el: '#app',

  data() {
    return {
      playerHp: 90,
      monsterHp: 100,
      gameMode: false,
      gameLog: []
    }
  },

  methods: {
    startGame() {
      this.gameMode = true;
      // set HP to default
      this.playerHp = 100;
      this.monsterHp = 100;
    },

    giveUp() {
      // set to gameMode false
      this.gameMode = false;
    },

    attack() {
      // reduce player HP
      this.playerHp -= this._calcDamage(4, 12);
      // reduce monster HP
      this.monsterHp -= this._calcDamage(3, 10);
    },

    specialAttack() {
      // reduce player HP
      this.playerHp -= this._calcDamage(4, 12);
      // reduce monster HP
      this.monsterHp -= this._calcDamage(5, 14);
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
    playerHp(NewHP, OldHP) {
      // check HP
      this._checkWin(NewHP);
      // add item to log
      this._addLog(NewHP, OldHP, "Player", 0);
    },

    monsterHp(NewHP, OldHP) {
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