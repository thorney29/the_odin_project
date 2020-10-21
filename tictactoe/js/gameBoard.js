const gameBoard = (() => {
  const getgameBoard = document.querySelectorAll('td');
  const gameBoardValues = [];
  // Get table cell IDs and store them in an array
  // i don't know if i need this yet
  // getgameBoard.forEach(gridBox => 
  //   gameBoardValues.push(gridBox.getAttribute('id')) ); 
  console.log(getgameBoard);
  // console.log(gameBoardValues);

  
 
 getgameBoard.forEach(gridBox => gridBox.addEventListener('click', setMarker),{ once: true });
  function setMarker (e) {
    console.log(this.innerHTML);
    if(this.innerHTML !== ''){
      //do nothing
    } else {
      this.classList.add('markerX');  
    }
  }

})(); 
