// Player Factory 
let player = (name, marker) => {
  let sayHello = () => alert('Get ready ' + name + "!");
  return { name, marker, sayHello };
}; 
 
let computerPlayer = document.getElementById("computerPlay").addEventListener("click", function(event) {
  if (this.checked === true){
    const playerComputer = player("Computer", "O");
    document.getElementById("player2_container").style.display = "none";
    alert("Goood luck!")
  } else {
    //do nothing
  }
}); 
	

let gameBoard = ((playerOne, playerTwo) => {
	let player1Name = "Player 1";
	let player2Name = "Player 2";
	playerOne = player(player1Name, "X");
	playerTwo = player(player2Name, "O");
	function updatePlayer () {
		let player1Name =  document.getElementById("player1").value;
		let player2Name =  document.getElementById("player2").value;
		let player1Updated =  document.getElementById("player_name_updated");
		playerOne.name = player1Name;
		playerTwo.name = player2Name;
		player1Updated.innerHTML =  playerOne.name
		document.getElementById("player1").style.display = "none";
		document.getElementById("getPlayer1").style.display = "none";
		return {playerOne, playerTwo};
	}   

	let player1 = document.getElementById("getPlayer1").addEventListener("click", updatePlayer);
	let player2 = document.getElementById("getPlayer2").addEventListener("click", updatePlayer);

	const gameBoardBoxes = document.querySelectorAll('td');
	let gameBoardBoxesPlayed = [];
	let gameBoardBoxesPlayer1 = [];

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
	    if(this.classList.contains('markerX') || this.classList.contains('markerO')){
	      	var css = 'table td:hover{ background-color: #00ff00 }';
			var style = document.createElement('style');
			if (style.styleSheet) {
			    style.styleSheet.cssText = css;
			} else {
			    style.appendChild(document.createTextNode(css));
			}
			document.getElementsByTagName('head')[0].appendChild(style);		  
	    } else { /*if there is nothing there, add an x if user clicks on box*/
	      this.classList.add('markerX');  
	      gameBoardBoxesPlayer1.push(this.getAttribute('id'));
	      updatePlayerTwo();
	      console.log(gameBoardBoxesPlayer1);
	    }
	  }

 	function updatePlayerTwo () {
		console.log("whooooo!");
		if(gameBoardBoxesPlayer1.length == 1){
			// if player 1 takes any corner, computer goes into center
			if(gameBoardBoxesPlayer1.includes(topLeftMarker)    ||
			   gameBoardBoxesPlayer1.includes(topRightMarker)   ||
			   gameBoardBoxesPlayer1.includes(bottomLeftMarker) ||
			   gameBoardBoxesPlayer1.includes(bottomRightMarker)) {
				middleCenter.classList.add('markerO');	
			} else if (gameBoardBoxesPlayer1.includes(middleCenterMarker)) { /* if player 1 plays middle */
				bottomRight.classList.add('markerO');
			}
		} else if (gameBoardBoxesPlayer1.length == 2) {
			if(gameBoardBoxesPlayer1.includes(topLeftMarker) && gameBoardBoxesPlayer1.includes(bottomRightMarker)){
					middleRight.classList.add('markerO');
			} else if(gameBoardBoxesPlayer1.includes(topRightMarker) || gameBoardBoxesPlayer1.includes(bottomLeftMarker)) { 
				middleLeft.classList.add('markerO');
			}	
		} else if (gameBoardBoxesPlayer1.length == 3) {
			if(gameBoardBoxesPlayer1.includes(middleLeftMarker)){
				bottomLeft.classList.add('markerO');
			} else {
				middleLeft.classList.add('markerO');
				alert("You snooze, you lose!");
			}
		} else if (gameBoardBoxesPlayer1.length == 3) {
			if(gameBoardBoxesPlayer1.includes(topRightMarker)){
				Top.classList.add('markerO');
			}
		}
	}
 
  return {updatePlayerTwo};
})();

