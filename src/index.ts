import { FuelTank } from './fuel-tank';
import { FuelTankDrawer } from './fuel-tank-drawer';
import * as p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import { CanvasOffset } from './canvas-offset';
import { QuizDrawer } from './quiz-drawer';
import { Quiz } from './quiz';
import { Star } from './star';
import { Landscape } from './landscape';
import { Question } from './question';

let fuelBar: FuelTank;
let fuelBarDrawer: FuelTankDrawer;
let canvasOffset;

let quiz: Quiz;

interface Globals {
  nextQuestion: boolean,
  givenAnswer: Array<string>
}

const globals: Globals = {
  nextQuestion: true,
  givenAnswer: [],
};
let quizDrawer: QuizDrawer;

let stars: Array<Star> = [];
let landScape: Landscape;

let canvasWidth = 600;
let canvasHeight = 400;

let fuelBarHeight = 300;
let fuelBarWidth = 30;

const s = (s: any) => {
  s.setup = () => {
    s.createCanvas(canvasWidth, canvasHeight);

    s.noStroke();
    s.background(0);

    createStars(s);
    createLandscape(s);

    quiz = createQuiz();
    quizDrawer = new QuizDrawer(quiz, s);

    fuelBar = new FuelTank(fuelBarWidth, fuelBarHeight);

    canvasOffset = new CanvasOffset(50, (canvasHeight - fuelBarHeight) / 2);
    fuelBarDrawer = new FuelTankDrawer(fuelBar, canvasOffset, s);
  };

  s.draw = () => {
    s.clear();
    s.background(0);
    drawStars(s);
    drawLandscape(s);
    fuelBarDrawer.draw();
    quizDrawer.draw(globals, canvasWidth, canvasHeight);
  };

  s.keyPressed = () => {
    if (s.keyCode === s.ENTER && globals.givenAnswer.length > 0) {
      checkAnswer();
      globals.givenAnswer = [];
    }

    if (s.keyCode === s.BACKSPACE) {
      globals.givenAnswer.pop();
    }

    if (globals.givenAnswer.length === 2) {
      return;
    }

    if (s.keyCode >= 48 && s.keyCode <= 57 || s.keyCode >= 96 && s.keyCode <= 105) {
      globals.givenAnswer.push(s.key.toString());
    }
  };
};

new p5(s);

function createQuiz() {
  let questions = [];
  let firstNumber;
  let secondNumber;
  let answer;
  for (let i = 0; i < 1000; i++) {
    firstNumber = Math.floor(Math.random() * 10);
    secondNumber = Math.floor(Math.random() * 10);
    answer = firstNumber + secondNumber;
    questions.push(new Question('' + firstNumber + ' + ' + secondNumber + ' = ', '' + answer));
  }

  return new Quiz(questions);
}

function createStars(s: any) {
  for (let i = 0; i < 100; i++) {
    stars.push(new Star(s.random(s.width), s.random(s.height), s.random(2, 3), s.random(100, 255)));
  }
}

function drawStars(s: any) {
  s.noStroke();
  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    let scale = star.size + s.sin(star.t);
    star.t += 0.05;
    s.fill(star.hue);
    s.ellipse(star.offsetX, star.offsetY, scale, scale);
  }
}

function createLandscape(s: any) {
  landScape = new Landscape(canvasWidth / 2, canvasHeight, canvasWidth * 1.5, 200);
}

function drawLandscape(s: any) {
  s.fill('#909090');
  s.ellipse(landScape.offsetX, landScape.offsetY, landScape.width, landScape.height);

  for (let i = 0; i < landScape.craters.length; i++) {
    s.fill('#555555');
    s.push();
    s.translate(landScape.craters[i][0], landScape.craters[i][1]);
    s.rotate(landScape.craters[i][3]);
    s.ellipse(0, 0, landScape.craters[i][2] * 60, landScape.craters[i][2] * 20);
    s.fill('#aaaaaa');
    s.ellipse(5, 0, landScape.craters[i][2] * 60, landScape.craters[i][2] * 20);
    s.pop();
  }
}

function checkAnswer() {
  if (quiz.isCorrectAnswer(globals.givenAnswer.join(''))) {
    fuelBar.addFuel();
  } else {
    fuelBar.removeFuel();
  }

  quiz.nextQuestion();
}
