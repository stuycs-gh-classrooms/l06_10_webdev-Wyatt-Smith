let month;
let day;
let hour;
let minute;
let second;
let centerX;
let centerY;
let radius;

function setup() {
  createCanvas(400,400);
  background(255);
  centerX = width/2;
  centerY = height/2;
  radius = 150;
  updateTime();
  frameRate(1);
}
function draw() {
  updateTime();
  clockFace();
  drawDate();
  drawHand(hour,minute,second,70,4);
  drawHand(-1,minute,second,110,2);
  drawHand(-1,-1,second,130,1);
}

function updateTime() {
  month = month();
  day = day();
  hour = hour();
  minute = minute();
  second = second();
}

function timeToAngle(hours, minutes, seconds) {
  // Add fractions for smooth minute and hour hand 
  if (int(hours) != -1) {
    return (((hours%12)/12.) + (minutes/60./12.) + (seconds/60./12./60.)) * (2*PI);
  }
  if (int(minutes) != -1) {
    return ((minutes/60.) + (seconds/60./60.)) * (2*PI);
  }
  return (seconds/60.) * (2*PI);
  }

function drawHand(hours, minutes, seconds, longness, wideness) {
  strokeWeight(wideness);
  let angle;
  if (hours != -1) {
    angle = timeToAngle(hours,minutes,seconds);
    stroke(0);
  }
  else if (minutes != -1) {
    angle = timeToAngle(-1,minutes,seconds);
    stroke(0);
  }
  else {
    angle = timeToAngle(-1,-1,seconds);
    stroke(255,0,0);
  }
  let endX = centerX + cos(angle-(PI/2)) * longness;
  let endY = centerY + sin(angle-(PI/2)) * longness;
  line(centerX,centerY, endX, endY);
}

function clockFace() {
  strokeWeight(1);
  stroke(0);
  fill(#F5E277);
  circle(centerX,centerY, radius*2);
  let marks = 0;
  // Loops for time divisions
  while (marks < 60) {
    stroke(#004DF0);
    // Make 5 minute marks wider
    if (marks % 5 == 0) {
      strokeWeight(3);
    }
    else {
      strokeWeight(1);
    }
    let angle = timeToAngle(-1,-1,marks) - (PI/2);
    let startX = centerX + cos(angle) * (radius-20);
    let startY = centerY + sin(angle) * (radius-20);
    let endX = centerX + cos(angle) * (radius-10);
    let endY = centerY + sin(angle) * (radius-10);
    line(startX,startY,endX,endY);
    marks ++;
  }
}

function drawDate() {
  textSize(12);
  fill(#004DF0);
  text(month+"/"+day,centerX+25,centerY-15);
}
