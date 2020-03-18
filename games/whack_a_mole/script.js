window.onload = function(){
	function setDate() {
		const now = new Date();
		const mm = now.getMonth();
		const dd = now.getDay();
		const dt = now.getDate();
		const yyyy = now.getFullYear();
		const secs = now.getSeconds();
		const mins = now.getMinutes();
		const hrs = now.getHours();
		const monthName = [
			'January','February','March','April',
			'May','June','July','August','September',
			'October','November','December'
		];
		const dayName = [ 'Sunday', 'Monday', 'Tuesday',
			'Wednesday', 'Thursday', 'Friday',
			'Saturday'
		];
		
		var hours ="";
		var minutes="";
		var seconds="";

		var month="";
		var day="";
		var date="";
		var year="";
		var meridian ="";
		if (hrs > 12) {
			hours = hrs - 12;
			meridian = "pm";	
		} else {
			hours = hrs;
			if(hours == 12){
			  meridian = "pm";
			}else{
			  meridian = "am";
			}
		}

		if (hours < 10) {
			hours = '0' + hours;
		}
		if (secs < 10) {
			seconds = '0' + secs;
		} else {
			seconds = secs;
		}
		
		if (mins < 10) {
			minutes= '0' + mins;
		} else {
			minutes = mins;
		}
		month = monthName[mm];
		day = dayName[dd];
		date = dt;
		year = yyyy;
		const presentDate = document.querySelector('.date');
		//present.innerHTML = 
		presentDate.innerHTML = `Date: ${day}, ${date} ${month} ${year}. | Time: ${hours}:${minutes}:${seconds}${meridian}`;
		//dt +" " +month +" " +year". | Time
	}
	setInterval(setDate,1000);
}

var W = class Whackmole {
	constructor(start, moles, score, count, stop, first, second, third, name_1, name_2, name_3, player) {
		this.bStart = start;
		this.moles = moles;
		this.scoreValue = score;
		this.moleValue = count;
		this.bStop = stop;
		this.gameTime = 10000;
		this.player = player;
		this.name_list = [];
		this.name_list.push(name_1.text(), name_2.text(), name_3.text());
		this.score_list = [];
		this.score_list.push(first.text(), second.text(), third.text());
		

		this.minPeepTime = 450
		this.maxPeepTime = 1200;
		this.numOfMoles = this.moles.length;

		this.timeleft;
		this.timeUp = false;
		this.peepTimer;
		this.gameTimer;
		this.downTimer;
		this.whackTimer;
		this.moleScored = 0;
		this.moleCount = 0;
		this.prevMoleNumber;
		this.gameTimer = null;
		this.peepTimer = null;
		this.remTime;
		this.isBonked;

	}

	init() {
		console.log(this.score_list)
		console.log(this.name_list)
		var hS = prompt("Please enter your name", "Player name");
		if ((hS != null) || (hs !== "Player name")) {
				this.playerName = hS;
		}
		console.log(this.playerName)
		this.isPaused = false;
		this.moleScored = 0;
		this.moleCount = 0;
		this.gameTime = 30000;
		this.resume();

	}

	pause() {
		console.log('Game paused...');
		this.moles.removeClass('up');
		this.timeUp = true;
		this.bStart.text('Resume Game');
		clearTimeout(this.peepTimer);
		clearTimeout(this.gameTimer);
		clearInterval(this.downtimer);
		this.isPaused = true;
	}

	resume() {
		this.scoreBoard();
		if (this.isPaused) {
			this.gameTime = this.remTime * 1000;
		}
		this.timeUp = false;
		this.countdown();
		this.prevMoleNumber = null;
		this.bStart.text('Pause Game');
		this.peep();
		this.gameTimer = setTimeout(() => {
			console.log('Game Over...');
			this.bStart.text('Start Game');
			this.timeUp = true;
		}, this.gameTime);
		this.isPaused = false;
	}

	stop() {
		console.log('Game Stopped...');
		console.log(this.moleScored);
		if (this.moleScored > this.score_list[0]){
			this.score_list[0] = this.moleScored;
			this.name_list[0] = this.player;
			this.score_list[0].text(this.moleScored);
			this.name_list[0].text(this.player);
			console.log(this.player, this.moleScored);
		}else if(this.moleScored > this.score_list[1]){
			this.score_list[1] = this.moleScored;
			this.name_list[1] = this.player;
			console.log(this.player, this.moleScored);
		}else if(this.moleScored > this.score_list[2]){
			this.score_list[2] = this.moleScored;
			this.name_list[2] =  this.player;
			console.log(this.player, this.moleScored);
		}
		this.moles.removeClass('up');
		this.timeUp = true;
		this.bStart.text('Start Game');
		
		clearTimeout(this.peepTimer);
		clearTimeout(this.gameTimer);
		clearInterval(this.downTimer);
		this.moleScored = 0;
		this.moleCount = 0;
		this.timeleft = "***";
		document.getElementById("timer").innerHTML = this.timeleft;
	}

	countdown() {
		document.getElementById("timer").innerHTML = (this.gameTime / 1000) + '&nbsp' + 'seconds';
		var t = new Date();
		this.eT = (t.setSeconds(t.getSeconds() + this.gameTime * 0.001)) / 1000;
		if (this.timeUp === false) {

			this.downTimer = setInterval(() => {
				this.cT = new Date();
				this.timeleft = Math.round((this.eT - (this.cT / 1000)));
				if (this.timeUp === true) {
					clearInterval(this.downTimer);
					this.remTime = this.timeleft;
				}
				document.getElementById("timer").innerHTML = this.timeleft + '&nbsp' + 'seconds';
				if (this.timeleft === 0) {
					clearInterval(this.downTimer);
					document.getElementById("timer").innerHTML = "TIME UP!"
				}
			}, 1000);
		}
	}

	peep() {
		const time = this._randomTime(this.minPeepTime, this.maxPeepTime);
		const mole = this._randomMole(this.moles);
		mole.attr('src', './whack_a_mole/mole.png');
		mole.addClass('up');
		this.moleCount++;
		this.scoreBoard(this.moleScored, this.moleCount);
		this.peepTimer = setTimeout(() => {
			mole.removeClass('up');
			setTimeout(() => {
				if (this.timeUp === false) {
					this.peep();
				}else{
					this.stop();
				}
			}, 1000);
		}, time);

	}

	changeWhacked() {

	}

	changeImage() {

		return mole.src;
	}

	_randomTime(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	// randomly selects one of the moles to display
	_randomMole(moles) {
		const idx = Math.floor(Math.random() * this.numOfMoles);
		const mole = moles.eq(idx);
		if (idx === this.prevMoleNumber) {
			console.log('...same mole...try again...');
			return this._randomMole(moles);
		}
		this.prevMoleNumber = idx;
		return mole;
	}

	scoreBoard() {
		this.player.text(this.playerName)
		this.scoreValue.text(this.moleScored);
		this.moleValue.text(this.moleCount);
	}

	bonk(mole) {
		$('.content').css("background", "#53ff1a");
		setTimeout(() => {
			$('.content').css("background", "#e6f1ff");
		}, 200);
		mole.attr('src', './whack_a_mole/mole-whacked.png');
		game.moleScored++;
		game.scoreBoard();
		mole.removeClass('up');
	}
}
/*(start, moles, score, count, stop, timing)*/
var game = new W($('.btnStart'), $('.mole-pic'), $('.score-out'), $('.mole-out'), $('#btnStop'),
	$('#first'), $('#second'), $('#third'), $('#name_first'), $('#name_second'), $('#name_third'), $('#btnPlayer'));
game.bStart.click(function () {
	if (game.bStart.text() === 'Start Game') {
		game.init();
	} else if (game.bStart.text() === 'Pause Game') {
		game.pause();
	} else if (game.bStart.text() === 'Resume Game') {
		game.resume();
	}
});

game.bStop.click(function () {
	game.stop()
});

game.moles.click(function () {
	game.bonk($(this));
});
 
