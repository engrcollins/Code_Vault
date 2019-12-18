var W = class Whackmole{
  constructor(start, moles, score, count, stop){
	  this.bStart = start;
	  this.moles = moles;
	  this.scoreValue = score;
	  this.moleValue = count;
	  this.bStop = stop;
	  this.gameTime = 30000;
	  
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
  
	init(){
			this.isPaused = false;
			this.moleScored = 0;
			this.moleCount = 0;
			this.gameTime = 30000;
			
			this.resume();
			
	}
	
	pause(){
	  console.log('Game paused...');
	  this.moles.removeClass('up');
	  this.timeUp = true;
	  this.bStart.text('Resume Game');
	  clearTimeout(this.peepTimer);
	  clearTimeout(this.gameTimer);
	  clearInterval(this.downtimer);
	  this.isPaused = true;
	}
	
	resume(){
			this.scoreBoard();
			if(this.isPaused){
				this.gameTime = this.remTime*1000;
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

	stop(){
	        console.log('Game Stopped...');
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
		
	countdown(){
		document.getElementById("timer").innerHTML = (this.gameTime/1000) + '&nbsp'+'seconds';
		var t = new Date();
		this.eT = (t.setSeconds(t.getSeconds() + this.gameTime*0.001))/1000;
		if(this.timeUp === false){
		  
		  this.downTimer = setInterval(()=>{
			this.cT = new Date();
			this.timeleft = Math.round((this.eT - (this.cT/1000)));
			if(this.timeUp === true){
			  clearInterval(this.downTimer);
			  this.remTime = this.timeleft;	
			}
			document.getElementById("timer").innerHTML = this.timeleft + '&nbsp'+'seconds';
			if(this.timeleft === 0){
			  clearInterval(this.downTimer);
			  document.getElementById("timer").innerHTML = "TIME UP!"
			}
		  }, 1000);
		}
	}

	peep(){
	  const time = this._randomTime(this.minPeepTime, this.maxPeepTime);
	  const mole = this._randomMole(this.moles);
	  mole.attr('src', './whack-a-mole/mole.png');
	  console.log(mole.src)	 
	  mole.addClass('up');
	  this.moleCount++;
	  this.scoreBoard(this.moleScored, this.moleCount);
	  
	  this.peepTimer = setTimeout(() => {
	    console.log(mole.src);
	    mole.removeClass('up');
	    setTimeout(()=>{
		  if(this.timeUp === false){
		    this.peep();
		  }
		}, 1000);
	  }, time);
	  
	}

	changeWhacked(){
	  
	}  
	
	changeImage(){
	  
	  return mole.src;
	}
	
	_randomTime(min, max){
	  return Math.round(Math.random() * (max - min) + min);
		}
		
		// randomly selects one of the moles to display
	_randomMole(moles){
	  const idx = Math.floor(Math.random() * this.numOfMoles);
	  const mole = moles.eq(idx);
	  if(idx === this.prevMoleNumber){
	  	console.log('...same mole...try again...');
		return this._randomMole(moles);
	  }
	  this.prevMoleNumber = idx;
	  return mole;
	}
	
	scoreBoard(){
	  this.scoreValue.text(this.moleScored);
	  this.moleValue.text(this.moleCount);
	}
	
	bonk(mole){
		$('.wrapper').css("background", "#53ff1a");
		setTimeout(() => {
		  $('.wrapper').css("background", "#e6f1ff");
		}, 200);
		mole.attr('src', './whack-a-mole/mole-whacked.png');
		game.moleScored++;
		game.scoreBoard();
		mole.removeClass('up');
	}
}
/*(start, moles, score, count, stop, timing)*/
var game = new W($('#btnStart'), $('.mole-pic'), $('.score-out'), $('.mole-out'), $('#btnStop'), );
game.bStart.click(function(){
	if (game.bStart.text() === 'Start Game'){
	  game.init();
	}else if(game.bStart.text() === 'Pause Game'){
	  game.pause();
	}else if(game.bStart.text() === 'Resume Game'){
	  game.resume();
	}
});

game.bStop.click(function(){
	game.stop()
});

game.moles.click(function(){
		game.bonk($(this));
});

var highestScore = game.score();
