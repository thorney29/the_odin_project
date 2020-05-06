var egg = document.getElementById("egg");
var clickDown = 0;
var curXPos = 0;
var curDown = false; 
var timer = "";
var stage = document.querySelector('.stage');
var sound1 = new Audio("/assets/sounds/doorbell-5.wav");
let sound2 = new Audio("/assets/sounds/Clock-ringing.mp3");
let timeRemaining = document.querySelector('#timeRemainingIndicator');
let time = document.querySelector('#timeCountdown');
let breakCountValue = document.querySelector('#breakCount');
let breakCount = Number(breakCountValue.textContent); 
var milliseconds = 0;
var millis = 0;
var minutes = 0;
var seconds = 0;

//Mouse Move Listener
stage.addEventListener('mousemove', setStage); 
function setStage (e) {
	if(curDown === true){ 
	    if (curXPos >= 5 && clickDown + 5 < e.pageX) {
			curXPos -=5;
			clickDown +=5;
			$('#egg').scrollLeft(curXPos);
  			if (milliseconds > 60000) {
			    milliseconds = curXPos / 18;
        	} 
        	milliseconds = milliseconds * 60000 
   //      	console.log('top ' + curXPos);
			// console.log('milliseconds ' + milliseconds);
	      	// over 5 minutes
	      	if(300000 < milliseconds) {
		      	timeRemainingIndicator.classList.remove('yellow');
		      	timeRemainingIndicator.classList.remove('red');
		      	timeRemainingIndicator.classList.add('green');
		      	// console.log('milliseconds green ' + milliseconds);
		    }
		    // at 5 minutes
		    if(milliseconds <= 300000) {
		      	timeRemainingIndicator.classList.remove('green');
		      	timeRemainingIndicator.classList.remove('red');
		       	timeRemainingIndicator.classList.add('yellow');
		       	// console.log('milliseconds yellow ' + milliseconds); 
		    }
		    // under 1 minute
			if(milliseconds <= 60000) { 
				timeRemainingIndicator.classList.remove('green');
		      	timeRemainingIndicator.classList.remove('yellow');
		      	timeRemainingIndicator.classList.add('red');
		      	// console.log('milliseconds red ' + milliseconds); 
		    }
	    } else if (curXPos <= 1180 && clickDown - 5 > e.pageX) {
			curXPos += 5;
			clickDown -= 5;
			$('#egg').scrollLeft(curXPos);
			// console.log('bottom ' + curXPos);
			// console.log('milliseconds ' + milliseconds);
          	if (milliseconds > 60000) {
			    milliseconds = curXPos / 19;
        	}
 			milliseconds = milliseconds * 60000
			if(300000 < milliseconds) {
		      	timeRemainingIndicator.classList.remove('yellow');
		      	timeRemainingIndicator.classList.remove('red');
		      	timeRemainingIndicator.classList.add('green');
		    }
		    if(milliseconds <= 300000) {
		      	timeRemainingIndicator.classList.remove('green');
		      	timeRemainingIndicator.classList.remove('red');
		       	timeRemainingIndicator.classList.add('yellow'); 
		    }
			if(milliseconds <= 60000) { 
				timeRemainingIndicator.classList.remove('green');
		      	timeRemainingIndicator.classList.remove('yellow');
		      	timeRemainingIndicator.classList.add('red'); 
		    }
	    } 
	}
}
stage.addEventListener('mouseup', setTimer);
function setTimer (e) {

	console.log('Timer milliseconds ' + milliseconds);
	curDown = false; 
	//Timer begins here
	timer = setInterval(function () {
		if (curXPos) {
			curXPos -= .315;
			// console.log(curXPos)
			$('#egg').scrollLeft(curXPos);	
      		millis = milliseconds - 1000;
	        milliseconds -= 1000;
	        if(milliseconds > 0) {
				minutes = Math.floor(millis / 60000);
	  			seconds = ((millis % 60000) / 1000).toFixed(0);
		        time.textContent = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
			}
			if(milliseconds === 0) { 
				sound1.play(); //HERES THE AUDIO ALERT
				time.textContent = 'BREAK!';
				breakCount += 1;
		    	breakCountValue.textContent = breakCount;
				setShortBreakTimer(e);
		     	if (breakCount === 4) {
		    		setLongBreakTimer(e);
		    	}
		    	return time.textContent;
	    	}
     
			 console.log('top/bottom ' + curXPos);
			 console.log('milliseconds ' + milliseconds);
			 // console.log('clickDown ' + clickDown);
			 // milliseconds = curXPos / 18;
		}
    }, 1000); 
}
function setBreakTimer (e) {
	curDown = false; 
	//Timer begins here
	timer = setInterval(function () {
		if (curXPos) {
			curXPos -= .315; 
			$('#egg').scrollLeft(curXPos);	
      		millis = milliseconds - 1000;
	        milliseconds -= 1000;
	        if(milliseconds > 0) {
				minutes = Math.floor(millis / 60000);
	  			seconds = ((millis % 60000) / 1000).toFixed(0);
		        time.textContent = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
			}
			if(milliseconds === 0) { 
				sound2.play(); //HERES THE AUDIO ALERT
				time.textContent = 'BREAK!';
				manualTimer(e);
		    	return time.textContent;
	    	}
     
			 console.log('top/bottom ' + curXPos);
			 console.log('milliseconds ' + milliseconds);
			 // console.log('clickDown ' + clickDown);
			 // milliseconds = curXPos / 18;
		}
    }, 1000); 
}
function setShortBreakTimer (e) { 
	let shortbreakValue = shortbreakDuration.value;
	curDown = true; 
  	clickDown = 0;  
  	clearInterval(timer);
    curXPos = (Number(shortbreakValue)) * 19;
  	milliseconds = curXPos / 19;

    setStage(e);
	setBreakTimer(e);
}
function setLongBreakTimer (e) {
	let longbreakValue = longbreakDuration.value;
	curDown = true; 
  	clickDown = 0;  
  	clearInterval(timer);
  	curXPos = (Number(longbreakValue)) * 19;
  	milliseconds = curXPos / 19;
  	setStage(e);
	setBreakTimer(e);
}
//Mousedown and up listeners
stage.addEventListener('mousedown', function (e) {
  curDown = true; 
  clickDown = e.pageX;  
  clearInterval(timer);
});

//Prevents highlighting
function stopDefAction(evt) {
    evt.preventDefault();
}
function manualTimer (e) {
	curDown = true; 
  	clickDown = 0;  
  	clearInterval(timer);
	let timerValue = sessionDuration.value; 
    curXPos = (Number(timerValue)) * 19;
  	milliseconds = curXPos / 19;

    setStage(e);
    setTimer(e);
}
function resetAll () {
 	sessionDuration.value = 0;
	shortbreakDuration.value = 0;
	longbreakDuration.value = 0;
	breakCountValue.textContent = 0;
	time.textContent = 0;
	curXPos = 0;
	$('#egg').scrollLeft(curXPos);
  	clearInterval(timer);
}
stage.addEventListener( 'mousedown', stopDefAction);
session.addEventListener('click', manualTimer);	

let sessionDuration = document.querySelector('#sessionDuration');
let sessionButton = document.querySelector('#session');
let shortbreakDuration = document.querySelector('#shortbreakDuration');
let shortbreakDurationAdd1  = document.querySelector('.shortbreakDurationAdd1').addEventListener('click', function () {
			shortbreakDuration.value = (Number(shortbreakDuration.value) + 1);
});
let shortbreakDurationSubtract1  = document.querySelector('.shortbreakDurationSubtract1').addEventListener('click', function () {
			shortbreakDuration.value = (Number(shortbreakDuration.value) - 1);
});
let longbreakDuration = document.querySelector('#longbreakDuration');
let longbreakDurationAdd1  = document.querySelector('.longbreakDurationAdd1').addEventListener('click', function () {
			longbreakDuration.value = (Number(longbreakDuration.value) + 1);
});
let longbreakDurationSubtract1  = document.querySelector('.longbreakDurationSubtract1').addEventListener('click', function () {
			longbreakDuration.value = (Number(longbreakDuration.value) - 1);
});

let reset = document.querySelector('#reset').addEventListener('click', resetAll);
