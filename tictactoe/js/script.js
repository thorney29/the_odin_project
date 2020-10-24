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
 		 if ((gameBoardMarkerX[i]=="topLeft" && gameBoardMarkerX[i+1] == "topCenter" && gameBoardMarkerX[i+2]=="topRight")||
		 	(gameBoardMarkerX[i]=="midLeft" && gameBoardMarkerX[i+1] == "midCenter" && gameBoardMarkerX[i+2]=="midRight")|| 
		 	(gameBoardMarkerX[i]=="bottomLeft" && gameBoardMarkerX[i+1] == "bottomCenter" && gameBoardMarkerX[i+2]=="bottomRight") ||
		 	(gameBoardMarkerX[i]=="topLeft" && gameBoardMarkerX[i+1] == "midLeft" && gameBoardMarkerX[i+2]=="bottomLeft")||
		 	(gameBoardMarkerX[i]=="topCenter" && gameBoardMarkerX[i+1] == "midCenter" && gameBoardMarkerX[i+2]=="bottomCenter")||
			(gameBoardMarkerX[i]=="topRight" && gameBoardMarkerX[i+1] == "midRight" && gameBoardMarkerX[i+2]=="bottomRight")||
			(gameBoardMarkerX[i]=="topLeft" && gameBoardMarkerX[i+1] == "midCenter" && gameBoardMarkerX[i+2]=="bottomRight")||
		 	(gameBoardMarkerX[i]=="topRight" && gameBoardMarkerX[i+1] == "midCenter" && gameBoardMarkerX[i+2]=="bottomLeft")) {
		 		alert(playerOne.name + " wins!");
		 		// newGame();
		 		console.log(player + " also known as " + currentPlayer.name + " wins!");
		 } else if ((gameBoardMarkerO[0]=="topLeft" && gameBoardMarkerO[i+1] == "topCenter" && gameBoardMarkerO[i+2]=="topRight")||
		 	(gameBoardMarkerO[i]=="midLeft" && gameBoardMarkerO[i+1] == "midCenter" && gameBoardMarkerO[i+2]=="midRight")|| 
		 	(gameBoardMarkerO[i]=="bottomLeft" && gameBoardMarkerO[i+1] == "bottomCenter" && gameBoardMarkerO[i+2]=="bottomRight") ||
		 	(gameBoardMarkerO[i]=="topLeft" && gameBoardMarkerO[i+1] == "midLeft" && gameBoardMarkerO[i+2]=="bottomLeft")||
		 	(gameBoardMarkerO[i]=="topCenter" && gameBoardMarkerO[i+1] == "midCenter" && gameBoardMarkerO[i+2]=="bottomCenter")||
			(gameBoardMarkerO[i]=="topRight" && gameBoardMarkerO[i+1] == "midRight" && gameBoardMarkerO[i+2]=="bottomRight")||
			(gameBoardMarkerO[i]=="topLeft" && gameBoardMarkerO[i+1] == "midCenter" && gameBoardMarkerO[i+2]=="bottomRight")||
		 	(gameBoardMarkerO[i]=="topRight" && gameBoardMarkerO[i+1] == "midCenter" && gameBoardMarkerO[i+2]=="bottomLeft")) {
		 		alert(playerTwo.name + " wins!");
		 		console.log(player + " also known as " + currentPlayer.name + " wins!");
		 		newGame();
		 } else if (gameBoardMarkerX.length == 5){
		 	//nothing to see here
		 	console.log("I think this was a draw!");
		 	// newGame();
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

