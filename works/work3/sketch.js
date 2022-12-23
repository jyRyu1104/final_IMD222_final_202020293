// P_2_3_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw tool. shows how to draw with dynamic elements.
 *
 * MOUSE
 * drag                : draw with text
 *
 * KEYS
 * del, backspace      : clear screen
 * arrow up            : angle distortion +
 * arrow down          : angle distortion -
 * s                   : save png
 */
"use strict";

var x = 0;
var y = 0;
var stepSize = 5.0;

var font = "Georgia";
var letters =
  "문득 앨리스는 다리가 셋 달린 탁자에 다다랐다. 탁자는 유리로 만들어져 있었고, 그 위에 아주 작은 황금 열쇠가 있었다. 처음에 앨리스는 이 열쇠로 여기 있는 문을 열 수 있겠다고 생각했다. 하지만, 아! 자물쇠가 너무 크거나 열쇠가 너무 작았다. 이 열쇠로는 어찌해도 복도를 둘러싼 문을 열 가능성은 없었다. 앨리스는 다시 한 번 찬찬히 주위를 살펴보다 처음에는 발견하지 못했던 커튼을 발견했다. 그 커튼 뒤에는 높이가 고작 15 인치 밖에 되지 않는 아주 작은 문이 있었다. 혹시나 하는 마음에 작은 황금 열쇠를 넣어보았더니, 기쁘게도 딱 맞았다! 앨리스는 문을 열고 안을 보았다. 그 문은 작은 통로로 이어져 있었는데, 쥐 구멍보다 그리 크지 않은 정도였다. 앨리스는 무릎을 꿇고 통로 안을 들여다 보았는데, 통로는 난생 처음보는 아름다운 정원으로 이어지고 있었다. 앨리스가 얼마나 어두운 복도에서 나가 꽃들이 활짝 핀 정원을 거닐고 싶었했던지. 하지만, 그 문에는 머리도 집어넣을 수 없었다. 불쌍한 앨리스는 “내 머리가 지나간다고 해도 어깨는 도저히 못 넣겠는 걸. 어깨가 없으면 머리가 무슨 소용이야. 아, 내가 망원경처럼 접힐 수 있으면 좋겠네. 처음에 어떻게 접는지만 알면, 할 수 있을 것도 같은데.”하고 생각했다. 너무나 많은 말도 안되는 일들이 일어나고 있는 바람에, 앨리스는 점차 불가능한 것이란 거의 없다고 생각하기 시작했다.";
var fontSizeMin = 3;
var angleDistortion = 0.0;

var counter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  x = mouseX;
  y = mouseY;

  textFont(font);
  textAlign(LEFT);
  fill(0);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    var d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);

    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);

      push();
      translate(x, y);
      rotate(angle + random(angleDistortion));
      text(newLetter, 0, 0);
      pop();

      counter++;
      if (counter >= letters.length) counter = 0;

      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function keyReleased() {
  if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);
}

function keyPressed() {
  // angleDistortion ctrls arrowkeys up/down
  if (keyCode == UP_ARROW) angleDistortion += 0.1;
  if (keyCode == DOWN_ARROW) angleDistortion -= 0.1;
}
