// Player Factory 
let player = (name, marker, isPlaying) => {
  // let sayHello = () => alert('Get ready ' + name + "!");
  return { name, marker, isPlaying };
}; 
 
const gameBoard = (() => {
	let player1Name = "Player 1";
	let player2Name = "Player 2"; 
	let playerComputerName = "Computer";
	playerOne = player(player1Name, "X", true);
	playerTwo = player(player2Name, "O", true);
	let currentPlayer = playerOne;
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
  	      	}  
  	      	changeTurn();
  	      } else {
  	      	this.classList.add('markerO');
			gameBoardBoxesPlayer2.push(this.getAttribute('id'));
  	      	gameBoardBoxesPlayed.push(this.getAttribute('id')); 
  	      	changeTurn();
  	      }
	    }
	    if (gameBoardBoxesPlayed.length >= 5) {
			console.log('lets check for a winner!');
			winner();
		}
	}
	let updatePlayerComputer = () => {
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
		if (currentPlayer === playerOne) {
			currentPlayer = playerTwo;
 		} else {
			currentPlayer = playerOne;
		}
	};

    
    let winner = () => {
		console.log("whooooo!");
		let boardMarkers = document.querySelectorAll("#gameBoard td");
		let gameBoardMarkerX = [];
		let gameBoardMarkerO = [];
		boardMarkers.forEach(function(box) {
			if(box.classList.contains('markerX')) {
				gameBoardMarkerX.push(box.getAttribute('id'));
			} else if (box.classList.contains('markerO')) {
				gameBoardMarkerO.push(box.getAttribute('id'));
			}
		})

 		 if ((gameBoardMarkerX[0]=="topLeft" && gameBoardMarkerX[1] == "topCenter" && gameBoardMarkerX[2]=="topRight")||
		 	(gameBoardMarkerX[0]=="midLeft" && gameBoardMarkerX[1] == "midCenter" && gameBoardMarkerX[2]=="midRight")|| 
		 	(gameBoardMarkerX[0]=="bottomLeft" && gameBoardMarkerX[1] == "bottomCenter" && gameBoardMarkerX[2]=="bottomRight") ||
		 	(gameBoardMarkerX[0]=="topLeft" && gameBoardMarkerX[1] == "midLeft" && gameBoardMarkerX[2]=="bottomLeft")||
		 	(gameBoardMarkerX[0]=="topCenter" && gameBoardMarkerX[1] == "midCenter" && gameBoardMarkerX[2]=="bottomCenter")||
			(gameBoardMarkerX[0]=="topRight" && gameBoardMarkerX[1] == "midRight" && gameBoardMarkerX[2]=="bottomRight")||
			(gameBoardMarkerX[0]=="topLeft" && gameBoardMarkerX[1] == "midCenter" && gameBoardMarkerX[2]=="bottomRight")||
		 	(gameBoardMarkerX[0]=="topRight" && gameBoardMarkerX[1] == "midCenter" && gameBoardMarkerX[2]=="bottomLeft")) {
		 		alert(playerOne.name + " wins!");
		 } else if ((gameBoardMarkerO[0]=="topLeft" && gameBoardMarkerO[1] == "topCenter" && gameBoardMarkerO[2]=="topRight")||
		 	(gameBoardMarkerO[0]=="midLeft" && gameBoardMarkerO[1] == "midCenter" && gameBoardMarkerO[2]=="midRight")|| 
		 	(gameBoardMarkerO[0]=="bottomLeft" && gameBoardMarkerO[1] == "bottomCenter" && gameBoardMarkerO[2]=="bottomRight") ||
		 	(gameBoardMarkerO[0]=="topLeft" && gameBoardMarkerO[1] == "midLeft" && gameBoardMarkerO[2]=="bottomLeft")||
		 	(gameBoardMarkerO[0]=="topCenter" && gameBoardMarkerO[1] == "midCenter" && gameBoardMarkerO[2]=="bottomCenter")||
			(gameBoardMarkerO[0]=="topRight" && gameBoardMarkerO[1] == "midRight" && gameBoardMarkerO[2]=="bottomRight")||
			(gameBoardMarkerO[0]=="topLeft" && gameBoardMarkerO[1] == "midCenter" && gameBoardMarkerO[2]=="bottomRight")||
		 	(gameBoardMarkerO[0]=="topRight" && gameBoardMarkerO[1] == "midCenter" && gameBoardMarkerO[2]=="bottomLeft")) {
		 		alert(playerTwo.name + " wins!");
		 }
	}
 return {
		updatePlayerComputer,
		player,
		playerOne,
		playerTwo,
	};
  
})();

