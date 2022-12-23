var circles = [];

var minRadius = 1;
var maxRadius = 20;

// for mouse and up/down-arrow interaction
var mouseRect = 1;

var freeze = false;

// svg vector import
var module1;
var module2;

// style selector, hotkeys 1, 2, 3
var showCircle = false;
var showLine = false;
var showSVG = true;

function preload() {
  module1 = loadImage("data/01.svg");
  module2 = loadImage("data/02.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  cursor(CROSS);
  ellipseMode(RADIUS);
  rectMode(RADIUS);
  imageMode(CENTER);
}

function draw() {
  background("#3B7CA2");

  // Choose a random or the current mouse position
  var newX = random(maxRadius, width - maxRadius);
  var newY = random(maxRadius, height - maxRadius);
  if (mouseIsPressed && mouseButton == LEFT) {
    newX = random(mouseX - mouseRect, mouseX + mouseRect);
    newY = random(mouseY - mouseRect, mouseY + mouseRect);
  }

  // Try to fit the largest possible circle at the current location without overlapping
  for (var newR = maxRadius; newR >= minRadius; newR--) {
    var intersection = circles.some(function (circle) {
      return dist(newX, newY, circle.x, circle.y) < circle.r + newR;
    });
    if (!intersection) {
      circles.push(new Circle(newX, newY, newR));
      break;
    }
  }

  // Draw all circles
  circles.forEach(function (circle) {
    if (showLine) {
      // Try to find an adjacent circle to the current one and draw a connecting line between the two
      var closestCircle = circles.find(function (otherCircle) {
        return (
          dist(circle.x, circle.y, otherCircle.x, otherCircle.y) <=
          circle.r + otherCircle.r - 1
        );
      });
      if (closestCircle) {
        stroke(300, 330, 300);
        strokeWeight(0.75);
        line(circle.x, circle.y, closestCircle.x, closestCircle.y);
      }
    }

    // Draw the circle itself.
    circle.draw();
  });

  // Visualise the random range of the current mouse position
  if (mouseIsPressed && mouseButton == LEFT) {
    stroke(100, 230, 100);
    strokeWeight(1);
    rect(mouseX, mouseY, mouseRect, mouseRect);
  }
}

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.rotation = random(TAU);

  Circle.prototype.draw = function () {
    if (showSVG) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      if (this.r == maxRadius) {
        image(module1, 0, 0, this.r * 1.5, this.r * 1.5);
      } else {
        image(module2, 0, 0, this.r / 0.2, this.r * 7);
      }
      pop();
    }
    if (showCircle) {
      stroke(0);
      strokeWeight(1.5);
      ellipse(this.x, this.y, this.r);
    }
  };
}
