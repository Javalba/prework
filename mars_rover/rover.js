class RoverMars {
  constructor(id,position, direction, moves) {
    this.id = id;
    this.position = position;
    this.direction = direction;
    this.moves = moves;
  }
}

let probe = new RoverMars(0,[0,0],'N',0);
let myRover = new RoverMars (1,[0,0],'N',0);
let myRoverCompanion = new RoverMars (2,[10,10],'N',0);


var obstacles = {
  rock: [9,9],
  hole: [6,2],
};

/*Function that print result in html page and log console. */
function printResult(report,rover,movement){

  let info ="";
  let className="";
  //myRover.moves +=1;
  rover.moves +=1;
  switch (rover.id) {
    case 1:
      myRover = JSON.parse(JSON.stringify(rover));
      className="rover-moves";
      break;
    case 2:
      myRoverCompanion = JSON.parse(JSON.stringify(rover));
      className="rover-moves2";
      break;
  }
  if(!report.crash){
    var infoMove="";
    if(movement==="f") infoMove+="Go forward!";
    if(movement==="b") infoMove+="Go backward!";
    if(movement==="l") infoMove+="Turn left!";
    if(movement==="r") infoMove+="Turn right!";

  //ECMASCRIPT 6
    info = `${rover.moves} - ${infoMove} - Rover Position: [ ${rover.position[0]} ,  ${rover.position[1]}] Direction: ${rover.direction}`;
    //var info = rover.moves+" - "+infoMove+" - Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]\nDirection: "+rover.direction+"<br></br>";
  }else{
    info=`${rover.moves} - ${report.msg}`;
  }

  var para = document.createElement("p");
  var node = document.createTextNode(info);
  para.appendChild(node);
  var element = document.getElementsByClassName(""+className)[0];
  element.appendChild(para);
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
    //rover = lastState --> Destroy rover-probe reference.
    rover.position = lastState.position; // restore the last valid state local. Conservate rover-probe reference.
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
    //rover = lastState --> Destroy rover-probe reference.
    rover.position = lastState.position; // restore the last valid state local. Conservate rover-probe reference.
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
function userOrders(id) {

  if(id === 1){
    /*Catch user input into var orders.*/
    var orders = document.getElementById("userInput").value;
    probe = JSON.parse(JSON.stringify(myRover));
  }
  if(id === 2) {
    /*Catch user input into var orders.*/
    var orders = document.getElementById("userInput2").value;
    probe = JSON.parse(JSON.stringify(myRoverCompanion));
  }

  /*Convert orders to an array*/
  var arrayOrders = orders.split("");

  for (var i = 0; i < arrayOrders.length; i++) {
    switch(arrayOrders[i]) {
      case 'f':
        goForward(probe);
        break;
      case 'b':
        goBackward(probe);
        break;
      case 'r':
        turnRight(probe);
        break;
      case 'l':
        turnLeft(probe);
        break;
      }
    }
}

/*
* Set Mars Rover to initial values.
*/
function resetRover(id) {
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

  /*TWO ROVERS*/
  switch (rover.id) {
    case 1:
    if((rover.position[0] === myRoverCompanion.position[0]) && (rover.position[1] === myRoverCompanion.position[1])){
      report.msg = "Your Rove will bump into your companion!";
      return report;
    }
      break;
    case 2:
    if((rover.position[0] === myRover.position[0]) && (rover.position[1] === myRover.position[1])){
      report.msg = "Your Rove will bump into your companion!";
      return report;
    }
      break;
  }

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
