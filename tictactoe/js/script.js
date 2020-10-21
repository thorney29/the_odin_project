// Player Factory 
const player = (name, marker, isPlaying) => {
  // let sayHello = () => alert('Get ready ' + name + "!");
  return { name, marker, isPlaying };
}; 
 
const gameBoard = (() => {
	let player1Name = "Player 1";
	let player2Name = "Player 2"; 
	let playerComputerName = "Computer";
	playerOne = player(player1Name, "X", true);
	playerTwo = player(player2Name, "O", true);
	playerComputer = player(playerComputerName, "O", false);
 	document.getElementById("computerPlay").checked = false;
	
	function updatePlayer () {
		let player1NameUpdated =  document.getElementById("player1").value;
		let player2NameUpdated =  document.getElementById("player2").value;
		let playerComputerUpdated = document.getElementById("computerPlay"); 
		let player1Updated =  document.getElementById("player1_name_updated");
		let player2Updated =  document.getElementById("player2_name_updated");

		playerOne.name = player1NameUpdated;
		playerTwo.name = player2NameUpdated;
		player1Updated.innerHTML = "&nbsp;" + playerOne.name;
		
		document.getElementById("player1").style.display = "none";
		document.getElementById("getPlayer1").style.display = "none";
		if (playerComputerUpdated.checked == true){
		    document.getElementById("player2_container").style.display = "none";
		    document.getElementById("computerPlayContainer").innerHTML = "Player Two: " + playerComputerName;
		    playerComputer.isPlaying = true;
		    playerTwo.isPlaying = false;
		    alert("Goood luck!"); 
		 } else {
		    if(player2NameUpdated) {
				player2Updated.innerHTML = "&nbsp;" + playerTwo.name;
				document.getElementById("player2").style.display = "none";
				document.getElementById("getPlayer2").style.display = "none";
			    document.getElementById("computerPlayContainer").style.display = "none";
			}
		 }
		return {playerOne, playerTwo, playerComputer};
	}   

	let player1 = document.getElementById("getPlayer1").addEventListener("click", updatePlayer);
	let player2 = document.getElementById("getPlayer2").addEventListener("click", updatePlayer);
	let computerChecked = document.getElementById("computerPlay").addEventListener("click", updatePlayer);

	const gameBoardBoxes = document.querySelectorAll('td');
	let gameBoardBoxesPlayed = [];
	let gameBoardBoxesPlayer1 = [];
	let gameBoardBoxesPlayer2 = [];
	// Top Row
	const topLeft = gameBoardBoxes[0];
	const topCenter = gameBoardBoxes[1];
	const topRight = gameBoardBoxes[2];
	// Middle Rox
	const middleLeft = gameBoardBoxes[3];
	const middleCenter = gameBoardBoxes[4];
	const middleRight = gameBoardBoxes[5];
	// Bottom Row
	const bottomLeft = gameBoardBoxes[6];
	const bottomCenter = gameBoardBoxes[7];
	const bottomRight = gameBoardBoxes[8];
	// Top Row IDs
	const topLeftMarker = gameBoardBoxes[0].getAttribute('id');
	const topCenterMarker = gameBoardBoxes[1].getAttribute('id');
	const topRightMarker = gameBoardBoxes[2].getAttribute('id');
	// Middle Rox
	const middleLeftMarker = gameBoardBoxes[3].getAttribute('id');
	const middleCenterMarker = gameBoardBoxes[4].getAttribute('id');
	const middleRightMarker = gameBoardBoxes[5].getAttribute('id');
	// Bottom Row
	const bottomLeftMarker = gameBoardBoxes[6].getAttribute('id');
	const bottomCenterMarker = gameBoardBoxes[7].getAttribute('id');
	const bottomRightMarker = gameBoardBoxes[8].getAttribute('id');

	gameBoardBoxes.forEach(gridBox => gridBox.addEventListener('click', setMarker),{ once: true });
	function setMarker (e) {
	  	// remove x hover if there is an o or an x already there
	    if (this.classList.contains('markerX') || this.classList.contains('markerO')) {
	  //     	var css = 'table td:hover{ background: #00ff00 }';
			// var style = document.createElement('style');
			// if (style.styleSheet) {
			//     style.styleSheet.cssText = css;
			// } else {
			//     style.appendChild(document.createTextNode(css));
			// }
			// document.getElementsByTagName('head')[0].appendChild(style);		  
	    } else { /*if there is nothing there, add an x if user clicks on box*/
	      if (gameBoardBoxesPlayed.length % 2 === 0) {

  	      	this.classList.add('markerX'); 
  	      	gameBoardBoxesPlayer1.push(this.getAttribute('id'));
  	      	gameBoardBoxesPlayed.push(this.getAttribute('id'));
  		    if (playerComputer.isPlaying == true) {
  				updatePlayerComputer();
  	      	} else {
  	      	  	// changeTurn();
  	      	}
  	      	console.log(gameBoardBoxesPlayer1);
  	      } else {
  	      	this.classList.add('markerO');
			gameBoardBoxesPlayer2.push(this.getAttribute('id'));
  	      	gameBoardBoxesPlayed.push(this.getAttribute('id')); 
  	      	console.log(gameBoardBoxesPlayer2);
  	      }
	    }
	}
	let updatePlayerComputer = () => {
		console.log("yow!");
		if(gameBoardBoxesPlayed.length == 1){
			// if player 1 takes any corner, computer goes into center
			if(gameBoardBoxesPlayed.includes(topLeftMarker)    ||
			   gameBoardBoxesPlayed.includes(topRightMarker)   ||
			   gameBoardBoxesPlayed.includes(bottomLeftMarker) ||
			   gameBoardBoxesPlayed.includes(bottomRightMarker)) {
				middleCenter.classList.add('markerO');
				gameBoardBoxesPlayed.push(middleCenter.getAttribute('id')); 

			} else if (gameBoardBoxesPlayed.includes(middleCenterMarker)) { /* if player 1 plays middle */
				bottomRight.classList.add('markerO');
				gameBoardBoxesPlayed.push(bottomRight.getAttribute('id')); 
			}
		} else if (gameBoardBoxesPlayed.length == 3) {
			if(gameBoardBoxesPlayed.includes(topLeftMarker) && gameBoardBoxesPlayed.includes(bottomRightMarker)){
					middleRight.classList.add('markerO');
					gameBoardBoxesPlayed.push(middleRight.getAttribute('id')); 

			} else if(gameBoardBoxesPlayed.includes(topRightMarker) || gameBoardBoxesPlayed.includes(bottomLeftMarker)) { 
				middleLeft.classList.add('markerO');
				gameBoardBoxesPlayed.push(middleLeft.getAttribute('id')); 
			}	
		} else if (gameBoardBoxesPlayed.length == 5) {
			if(gameBoardBoxesPlayed.includes(middleLeftMarker)){
				bottomLeft.classList.add('markerO');
				gameBoardBoxesPlayed.push(bottomLeft.getAttribute('id')); 
			} else {
				middleLeft.classList.add('markerO');
				gameBoardBoxesPlayed.push(middleLeft.getAttribute('id')); 
				alert("You snooze, you lose!");
			}
		} else if (gameBoardBoxesPlayed.length == 7) {
			if(gameBoardBoxesPlayed.includes(topRightMarker)){
				topCenter.classList.add('markerO');
				gameBoardBoxesPlayed.push(topCenter.getAttribute('id')); 
			}
		}
	}

	const changeTurn = () => {
		if (player === playerOne) {
			player = playerTwo;
		} else {
			player = playerOne;
		}
	};
    function updatePlayerTwo() {
		console.log("whooooo!");

	// 	if(gameBoardBoxesPlayer1.length == 1){
	// 		// if player 1 takes any corner, computer goes into center
	// 		if(gameBoardBoxesPlayer1.includes(topLeftMarker)    ||
	// 		   gameBoardBoxesPlayer1.includes(topRightMarker)   ||
	// 		   gameBoardBoxesPlayer1.includes(bottomLeftMarker) ||
	// 		   gameBoardBoxesPlayer1.includes(bottomRightMarker)) {
	// 			middleCenter.classList.add('markerO');	
	// 		} else if (gameBoardBoxesPlayer1.includes(middleCenterMarker)) { /* if player 1 plays middle */
	// 			bottomRight.classList.add('markerO');
	// 		}
	// 	} else if (gameBoardBoxesPlayer1.length == 2) {
	// 		if(gameBoardBoxesPlayer1.includes(topLeftMarker) && gameBoardBoxesPlayer1.includes(bottomRightMarker)){
	// 				middleRight.classList.add('markerO');
	// 		} else if(gameBoardBoxesPlayer1.includes(topRightMarker) || gameBoardBoxesPlayer1.includes(bottomLeftMarker)) { 
	// 			middleLeft.classList.add('markerO');
	// 		}	
	// 	} else if (gameBoardBoxesPlayer1.length == 3) {
	// 		if(gameBoardBoxesPlayer1.includes(middleLeftMarker)){
	// 			bottomLeft.classList.add('markerO');
	// 		} else {
	// 			middleLeft.classList.add('markerO');
	// 			alert("You snooze, you lose!");
	// 		}
	// 	} else if (gameBoardBoxesPlayer1.length == 3) {
	// 		if(gameBoardBoxesPlayer1.includes(topRightMarker)){
	// 			Top.classList.add('markerO');
	// 		}
	// 	}
	}
 return {
		updatePlayerComputer,
		player,
		playerOne,
		playerTwo,
	};
  
})();

