var myRover = {
  position: [0,0],
  direction: 'N',
  moves: 0
};

var obstacles = {
  rock: [9,9],
  hole: [6,2],
};

/*Function that print result in html page and log console. */
function printResult(report,rover,movement){
  var info ="";
  myRover.moves +=1;
  if(!report.crash){

    var infoMove="";
    if(movement==="f") infoMove+="Go forward!";
    if(movement==="b") infoMove+="Go backward!";
    if(movement==="l") infoMove+="Turn left!";
    if(movement==="r") infoMove+="Turn right!";

  //ECMASCRIPT 6
    info = `${myRover.moves} - ${infoMove} - Rover Position: [ ${rover.position[0]} ,  ${rover.position[1]}] Direction: ${rover.direction}`;
    //var info = rover.moves+" - "+infoMove+" - Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]\nDirection: "+rover.direction+"<br></br>";

    var para = document.createElement("p");
    var node = document.createTextNode(info);
    para.appendChild(node);
    var element = document.getElementsByClassName("rover-moves")[0];
    element.appendChild(para);

  }else{
    info=`${myRover.moves} - ${report.msg}`;
    var para2 = document.createElement("p");
    var node2 = document.createTextNode(info);
    para2.appendChild(node2);
    var element2 = document.getElementsByClassName("rover-moves")[0];
    element2.appendChild(para2);

  }

}

/*Move rover forward one position
*/
function goForward(rover) {
  var movement="f";
  //var lastState = rover; --> WRONG! This objects point to the same address!
  // var lastState = Object.assign({}, rover); // Store by reference
  var lastState = JSON.parse(JSON.stringify(rover)); //Store last state by value

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
  var report = validations(rover,movement);
  if(report.crash){
    rover = JSON.parse(JSON.stringify(lastState)); // restore the last valid state local
    myRover = JSON.parse(JSON.stringify(lastState)); // restore the last valid state global
  }
  printResult(report,rover,movement);
}

/*Move rover backward one position*/
function goBackward(rover) {
  var movement="b";
  var lastState = JSON.parse(JSON.stringify(rover)); //Store last state by value
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
  var report = validations(rover,movement);
  if(report.crash){
    rover = JSON.parse(JSON.stringify(lastState)); // restore the last valid state local
    myRover = JSON.parse(JSON.stringify(lastState)); // restore the last valid state global
  }
  printResult(report,rover,movement);
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
  var report = validations(rover,movement);
  printResult(report,rover,movement);
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
  var report = validations(rover,movement);
  printResult(report,rover,movement);
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

  //Remove elements in html file
  var myNode = document.getElementsByClassName("rover-moves")[0];
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

/*
* - The rover is on a 10 x 10 grid
* - Obstacle detections.
* return true if validations are ok
* return false if validations are not ok.
*/
function validations (rover,movements){
var report = {
  crash : true,
  msg : ""
};

  //GRID 10X10
  if(rover.position[0] > 10 || (rover.position[1] > 10) || (rover.position[0] < 0) || (rover.position[1] < 0) ){
    report.msg = "Your Rove will goes off the grid. Stop.";
  }else
  if((rover.position[0] === obstacles.rock[0]) && (rover.position[1] === obstacles.rock[1])){
    report.msg = "Your probe will hit a rock. Stop ";
  }else
   if((rover.position[0] === obstacles.hole[0]) && (rover.position[1] === obstacles.hole[1])){
     report.msg = "Your probe will fall into a hole. Stop ";
  }
  else{
    report.crash=false;
  }
  return report;
}
