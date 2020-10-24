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
		
		if(player1NameUpdated == "" || player1NameUpdated == " ") {
			playerOne.name = playerOne.name;
		} else {
			playerOne.name = player1NameUpdated;
		}
		playerTwo.name = player2NameUpdated;
		
		let player1Updated =  document.getElementById("player1_name_updated");
		let player2Updated =  document.getElementById("player2_name_updated");
		player1Updated.innerHTML = "&nbsp;" + playerOne.name;
		
		document.getElementById("player1").style.display = "none";
		document.getElementById("getPlayer1").style.display = "none";
		if (playerComputerUpdated.checked == true){
		    document.getElementById("player2_container").style.display = "none";
		    document.getElementById("computerPlayContainer").innerHTML = "Player Two: " + playerComputerName + " <br/><br/><h3>&nbsp;  (GOOD LUCK!)</h3>";
		    playerComputer.isPlaying = true;
		    playerTwo.isPlaying = false;
		     
		 } else {
		    if(player2NameUpdated) {
				player2Updated.innerHTML = "&nbsp;" + playerTwo.name;
				document.getElementById("player2").style.display = "none";
				document.getElementById("getPlayer2").style.display = "none";
			    document.getElementById("computerPlayContainer").style.display = "none";
			}
		 }
		let newGameButton = document.getElementById('newGame');
		let startButton = document.getElementById('start');
 	    newGameButton.style.display = "flex";
 	    startButton.style.display = "none";
 	    newGameButton.addEventListener("click", newGame);

		return {playerOne, playerTwo, playerComputer};
	}   
	let updatePlayerDisplay = () => {
		let player1Updated =  document.getElementById("player1_name_updated");
		let player2Updated =  document.getElementById("player2_name_updated");
		player1Updated.innerHTML = "";
		player2Updated.innerHTML = "";
		document.getElementById("player1").style.display = "block";
		document.getElementById("getPlayer1").style.display = "flex";
		document.getElementById("player2_container").style.display = "block";
		document.getElementById("player2").style.display = "block";
		document.getElementById("getPlayer2").style.display = "flex";

	}

	let player1 = document.getElementById("getPlayer1").addEventListener("click", updatePlayer);
	let player2 = document.getElementById("getPlayer2").addEventListener("click", updatePlayer);
	let computerChecked = document.getElementById("computerPlay").addEventListener("click", updatePlayer);

	const gameBoardBoxes = document.querySelectorAll('td');
	let gameBoardBoxesPlayed = [];
	let gameBoardBoxesPlayer1 = [];
	let gameBoardBoxesPlayer2 = [];
	gameBoardBoxes.forEach(gridBox => gridBox.addEventListener('click', setMarker),{ once: true });
	
	function setMarker (e) {
	  	if (currentPlayer === playerOne && playerComputer.isPlaying === true) {
  	      	this.classList.add('markerX');
  	      	console.log("plays made by me");  
  	      	gameBoardBoxesPlayer1.push(this.getAttribute('id'));

  	      	console.log(gameBoardBoxesPlayer1); 
  	      	gameBoardBoxesPlayed.push(this.getAttribute('id'));
  		    if (playerComputer.isPlaying == true) {
  		    	console.log("plays made by computer");
  				updatePlayerComputer();
  				changeTurn();
  	      	} 	
  	      	changeTurn();
  	    } else if (gameBoardBoxesPlayed.length % 2 == 0) { 
			this.classList.add('markerX'); 
  	      	gameBoardBoxesPlayer1.push(this.getAttribute('id'));
  	      	gameBoardBoxesPlayed.push(this.getAttribute('id'));
  	      	changeTurn();
  	    } else {
  	      	this.classList.add('markerO');
			gameBoardBoxesPlayer2.push(this.getAttribute('id'));
  	      	gameBoardBoxesPlayed.push(this.getAttribute('id')); 
  	      	changeTurn();
  	    }
  	    if (gameBoardBoxesPlayed.length >= 5) {
			winner();
		}
	}
	let setComputerMarkerO = (location) => {
		setTimeout(function () {
            location.classList.add('markerO');
			gameBoardBoxesPlayed.push(location.getAttribute('id'));
    	}, 1000);
	}

	let updatePlayerComputer = () => {
	    // get current board
		let boardMarkers = document.querySelectorAll("#gameBoard td");
	
		let gameBoardMarkerX = [];
		boardMarkers.forEach(function(box) {
			if(box.classList.contains('markerX')) {
				gameBoardMarkerX.push(box.getAttribute('id'));
			}
		})
 		let board = boardMarkers;
		let x = gameBoardMarkerX;
		for(let i = 0; gameBoardMarkerX.length > i; i++){
 			if(gameBoardMarkerX.length == 1) {
				if(gameBoardMarkerX[i] !== "midCenter") {
					setComputerMarkerO(midCenter); 
				} else {
					setComputerMarkerO(topLeft);
				}
				
			} else if(gameBoardMarkerX.length == 2) {
				if( board[0].classList.contains("markerX") && board[1].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[5].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[7].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[1].classList.contains("markerX") && board[5].classList.contains("markerX") ||
					board[1].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[3].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[6].classList.contains("markerX") ||	
					board[5].classList.contains("markerX") && board[8].classList.contains("markerX") ) {
					setComputerMarkerO(topRight);
				} else if(	board[0].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") ) {
					setComputerMarkerO(topCenter);
				} else if(	board[0].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[7].classList.contains("markerX") && board[8].classList.contains("markerX") ) {
					setComputerMarkerO(bottomLeft);
				} else if(	board[0].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[6].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[6].classList.contains("markerX") && board[8].classList.contains("markerX") ) {
					setComputerMarkerO(bottomRight);
				} else if(	board[0].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[5].classList.contains("markerX") ) {
					setComputerMarkerO(midLeft);
				} else if( 	board[1].classList.contains("markerX") && board[2].classList.contains("markerX") ||	
						   	board[1].classList.contains("markerX") && board[3].classList.contains("markerX") ||	
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") ||	
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") ||	
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") ||	
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") ) {
					setComputerMarkerO(topLeft);
				} else if(	board[1].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[5].classList.contains("markerX") ) {
					setComputerMarkerO(bottomCenter);
				} else if(	board[2].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[4].classList.contains("markerX") ) {
					setComputerMarkerO(midRight);
				}
			} else if(gameBoardMarkerX.length == 3) {
				if(	board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[2].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[1].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[6].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[3].classList.contains("markerX") ||
					board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[4].classList.contains("markerX") || 
					board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[2].classList.contains("markerX") ||
					board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[0].classList.contains("markerX") ||
					board[1].classList.contains("markerX") && board[4].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[4].classList.contains("markerX") ||
					board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[1].classList.contains("markerX") ||
					board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[0].classList.contains("markerX") ||
					board[2].classList.contains("markerX") && board[4].classList.contains("markerX") && board[6].classList.contains("markerX") ||
					board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[4].classList.contains("markerX") ||
					board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[6].classList.contains("markerX") ||
					board[3].classList.contains("markerX") && board[4].classList.contains("markerX") && board[5].classList.contains("markerX") ||
					board[3].classList.contains("markerX") && board[5].classList.contains("markerX") && board[4].classList.contains("markerX") ||
					board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[0].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[8].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[7].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[6].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[5].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[3].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[2].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[0].classList.contains("markerX") ||
					board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[1].classList.contains("markerX")) {
						console.log(playerOne.name + "1 wins!");
				} else if(	board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[4].classList.contains("markerX") || 
							board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[4].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[4].classList.contains("markerX") || 
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[6].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[4].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[5].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[8].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[6].classList.contains("markerX")) {
					setComputerMarkerO(topLeft);
				} else if( 	board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[2].classList.contains("markerX") || 
							board[1].classList.contains("markerX") && board[4].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[4].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[4].classList.contains("markerX") || 
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[4].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[2].classList.contains("markerX")) {
					setComputerMarkerO(topCenter);
				} else if(	board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[5].classList.contains("markerX") || 
							board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[5].classList.contains("markerX") || 
							board[3].classList.contains("markerX") && board[1].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[1].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[1].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[1].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[1].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[1].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[5].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[5].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[8].classList.contains("markerX")) {
					setComputerMarkerO(topRight);
				} else if(	board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[4].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[4].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[6].classList.contains("markerX")) {
					setComputerMarkerO(midLeft);
				} else if(  board[4].classList.contains("markerX") && board[5].classList.contains("markerX") && board[7].classList.contains("markerX")) {
					setComputerMarkerO(midCenter);
				} else if(	board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[4].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[2].classList.contains("markerX") || 
							board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[4].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[4].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[4].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[4].classList.contains("markerX") ||				
							board[3].classList.contains("markerX") && board[8].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[8].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[8].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[3].classList.contains("markerX")) {
					setComputerMarkerO(midRight);
				} else if(	board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[3].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[5].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[3].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[5].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[4].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX") ||	
							board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[0].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[8].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[3].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[7].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[7].classList.contains("markerX")) {
					setComputerMarkerO(bottomLeft);
				} else if(	board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[8].classList.contains("markerX") && board[6].classList.contains("markerX") || 
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[8].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[1].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[8].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[1].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[6].classList.contains("markerX") && board[8].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[8].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[4].classList.contains("markerX")) {
					setComputerMarkerO(bottomCenter);
				} else if(	board[0].classList.contains("markerX") && board[1].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[2].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[4].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[6].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[0].classList.contains("markerX") && board[7].classList.contains("markerX") && board[6].classList.contains("markerX") || 
							board[1].classList.contains("markerX") && board[0].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[2].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[4].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[6].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[1].classList.contains("markerX") && board[7].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[0].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[3].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[0].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[4].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[5].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[5].classList.contains("markerX") || 
							board[2].classList.contains("markerX") && board[6].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[2].classList.contains("markerX") && board[7].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[2].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[3].classList.contains("markerX") && board[5].classList.contains("markerX") && board[0].classList.contains("markerX") ||
					 		board[3].classList.contains("markerX") && board[5].classList.contains("markerX") && board[1].classList.contains("markerX") ||
					 		board[3].classList.contains("markerX") && board[7].classList.contains("markerX") && board[2].classList.contains("markerX") ||
					 		board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[1].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[2].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[3].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[6].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[0].classList.contains("markerX") && board[7].classList.contains("markerX") ||
							board[4].classList.contains("markerX") && board[2].classList.contains("markerX") && board[5].classList.contains("markerX") ||
							board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[7].classList.contains("markerX")) {
					setComputerMarkerO(bottomRight);
				}

			
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	setComputerMarkerO(topCenter);
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);
				// } else if(board[5].classList.contains("markerX") && board[0].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// }

				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	setComputerMarkerO(topLeft);
				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomCenter);
				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	setComputerMarkerO(topLeft);
				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[1].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);

				// still needs added
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[2].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	console.log(playerOne.name + "1 wins!");

				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);
				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);
				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	setComputerMarkerO(midRight);
				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	console.log(playerOne.name + "1 wins!");
				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(topCenter);
				// } else if(board[5].classList.contains("markerX") && board[3].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	setComputerMarkerO(midRight);

				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	console.log(playerOne.name + "1 wins!");
				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[4].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);

				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(midLeft);
				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	setComputerMarkerO(topLeft);
				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[6].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomCenter);
				
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(topCenter);
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomRight);
				// } else if(board[5].classList.contains("markerX") && board[7].classList.contains("markerX") && board[8].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);

				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[0].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[1].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[2].classList.contains("markerX")) {
				// 	console.log(playerOne.name + "1 wins!");
				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[3].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[4].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[6].classList.contains("markerX")) {
				// 	setComputerMarkerO(topRight);
				// } else if(board[5].classList.contains("markerX") && board[8].classList.contains("markerX") && board[7].classList.contains("markerX")) {
				// 	setComputerMarkerO(bottomLeft);
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
	


 	let newGame = (player1_name_updated) => {
	    let gameBoardBoxesPlayed = [];
		let gameBoardBoxesPlayer1 = [];
		let gameBoardBoxesPlayer2 = [];
		playerOne.name = "Player 1";
		playerTwo.name = "Player 2";
		
		let clearBoard = document.querySelectorAll('#gameBoard td');
		clearBoard.forEach(marker => marker.removeAttribute('class')); 
		updatePlayerDisplay();
	}

    let winner = () => {
		console.log("whooooo!");
		// get current board
		let boardMarkers = document.querySelectorAll("#gameBoard td");

		let gameBoardMarkerX = [];
		let gameBoardMarkerO = [];
		boardMarkers.forEach(function(box) {
			if(box.classList.contains('markerX')) {
				gameBoardMarkerX.push(box.getAttribute('id'));
			} else if(box.classList.contains('markerO')) {
				gameBoardMarkerO.push(box.getAttribute('id'));
			}
		})
		console.log(gameBoardMarkerX);
		for(let i = 0; gameBoardMarkerX.length > i; i++) {
 		 if ((gameBoardMarkerX.includes("topLeft") && gameBoardMarkerX.includes("topCenter") && gameBoardMarkerX.includes("topRight"))||
		 	 (gameBoardMarkerX.includes("topLeft") && gameBoardMarkerX.includes("midLeft") && gameBoardMarkerX.includes("bottomLeft"))||
			 (gameBoardMarkerX.includes("midLeft") && gameBoardMarkerX.includes("midCenter") && gameBoardMarkerX.includes("midRight"))|| 
		 	 (gameBoardMarkerX.includes("bottomLeft") && gameBoardMarkerX.includes("bottomCenter") && gameBoardMarkerX.includes("bottomRight"))||
		 	 (gameBoardMarkerX.includes("topCenter") && gameBoardMarkerX.includes("midCenter") && gameBoardMarkerX.includes("bottomCenter"))||
			 (gameBoardMarkerX.includes("topRight") && gameBoardMarkerX.includes("midRight") && gameBoardMarkerX.includes("bottomRight"))||
			 (gameBoardMarkerX.includes("topLeft") && gameBoardMarkerX.includes("midCenter") && gameBoardMarkerX.includes("bottomRight"))||
			 (gameBoardMarkerX.includes("topRight") && gameBoardMarkerX.includes("midCenter") && gameBoardMarkerX.includes("bottomLeft"))) {
		 		alert(playerOne.name + " wins!"); 
		 		return;
		 } else if ((gameBoardMarkerO.includes("topLeft") && gameBoardMarkerO.includes("topCenter") && gameBoardMarkerO.includes("topRight"))||
		 	(gameBoardMarkerO.includes("midLeft") && gameBoardMarkerO.includes("midCenter") && gameBoardMarkerO.includes("midRight"))|| 
		 	(gameBoardMarkerO.includes("bottomLeft") && gameBoardMarkerO.includes("bottomCenter") && gameBoardMarkerO.includes("bottomRight")) ||
		 	(gameBoardMarkerO.includes("topLeft") && gameBoardMarkerO.includes("midLeft") && gameBoardMarkerO.includes("bottomLeft"))||
		 	(gameBoardMarkerO.includes("topCenter") && gameBoardMarkerO.includes("midCenter") && gameBoardMarkerO.includes("bottomCenter"))||
			(gameBoardMarkerO.includes("topRight") && gameBoardMarkerO.includes("midRight") && gameBoardMarkerO.includes("bottomRight"))||
			(gameBoardMarkerO.includes("topLeft") && gameBoardMarkerO.includes("midCenter") && gameBoardMarkerO.includes("bottomRight"))||
		 	(gameBoardMarkerO.includes("topRight") && gameBoardMarkerO.includes("midCenter") && gameBoardMarkerO.includes("bottomLeft"))) {
		 		alert(playerTwo.name + " wins!");
		 		return;
		 } else if (gameBoardMarkerX.length + gameBoardMarkerO.length == 8){
		 	alert("You are both equal.");
		 }
		}
	}
 return {
		updatePlayerComputer,
		player,
		playerOne,
		playerTwo,
	};
  
})();

