var myRover = {
  position: [0,0],
  direction: 'N',
  moves: 0
};

/*Function that print result in html page and log console. */
function printResult(rover,movement){
  rover.moves +=1;
  var infoMove="";
  if(movement==="f") infoMove+="Go forward!";
  if(movement==="b") infoMove+="Go backward!";
  if(movement==="l") infoMove+="Turn left!";
  if(movement==="r") infoMove+="Turn right!";

//ECMASCRIPT 6
  var info = `${rover.moves} - ${infoMove} - Rover Position: [ ${rover.position[0]} ,  ${rover.position[1]}] Direction: ${rover.direction}`;
  //var info = rover.moves+" - "+infoMove+" - Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]\nDirection: "+rover.direction+"<br></br>";

  var para = document.createElement("p");
  var node = document.createTextNode(info);
  para.appendChild(node);
  var element = document.getElementsByClassName("rover-moves")[0];
  element.appendChild(para);

}

/*Move rover forward one position
*/
function goForward(rover) {
  var movement="f";
  switch(rover.direction) {
    case 'N':
      rover.position[0]++;
      break;
    case 'E':
      rover.position[1]++;
      break;
    case 'S':
      rover.position[0]--;
      break;
    case 'W':
      rover.position[1]--;
      break;
  }
  validations(rover,movement);
  printResult(rover,movement);
}

/*Move rover backward one position*/
function goBackward(rover) {
  var movement="b";
  switch(rover.direction) {
    case 'N':
      rover.position[0]--;
      break;
    case 'E':
      rover.position[1]--;
      break;
    case 'S':
      rover.position[0]++;
      break;
    case 'W':
      rover.position[1]++;
      break;
  }
  printResult(rover,movement);
}

/*Turn rover right. Without moves.*/
function turnRight(rover) {
  var movement="r";
  switch(rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
  printResult(rover,movement);
}

/*Turn rover left. Without moves.*/
function turnLeft(rover) {
  var movement="l";
  switch(rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
printResult(rover,movement);
}

/*
* User orders given. Format example: ffrffls. Max 15 commands
*/
function userOrders() {

    /*Catch user input into var orders.*/
		var orders = document.getElementById("userInput").value;

    /*Convert orders to an array*/
    var arrayOrders = orders.split("");

    for (var i = 0; i < arrayOrders.length; i++) {
      switch(arrayOrders[i]) {
        case 'f':
          goForward(myRover);
          break;
        case 'b':
          goBackward(myRover);
          break;
        case 'r':
          turnRight(myRover);
          break;
        case 'l':
          turnLeft(myRover);
          break;
      }
    }
}

/*
* Set Mars Rover to initial values.
*/
function resetRover() {
  myRover.position = [0,0];
  myRover.direction ='N';
  myRover.moves = 0;

  var myNode = document.getElementsByClassName("rover-moves")[0];
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }

}

/*
* - The rover is on a 10 x 10 grid
*/
function validations (rover,movements){

  if(rover.position[0] >= 10) rover.position[0] = 10;
  if(rover.position[1] >= 10) rover.position[1] = 10;


}
