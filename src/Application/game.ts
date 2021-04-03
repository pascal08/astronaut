import * as p5 from 'p5';
import { Star } from '../Core/star';
import { Landscape } from '../Core/landscape';
import { QuizFactory } from '../Core/quiz.factory';
import { FuelTank } from '../Core/fuel-tank';
import { Canvas } from '../Core/canvas';
import { GameState } from './game.state';
import { Drawer } from '../UI/drawer';
import { Rocket } from '../Core/rocket';
import { Ticker } from '../Core/ticker';
import { KeyCode } from './key-code.enum';


export class Game {

  private canvas: Canvas;
  private state: GameState;
  private drawer: Drawer;

  private readonly _canvasWidth = 600;
  private readonly _canvasHeight = 400;
  private ticker: Ticker;

  constructor(p5: p5) {
    this.ticker = new Ticker;

    this.canvas = new Canvas(this._canvasWidth, this._canvasHeight);

    this.state = this.startGame();

    this.drawer = new Drawer(
      this.state,
      p5,
      this.canvas
    );
  }

  private startGame(): GameState {
    const stars: Array<Star> = [];
    for (let i = 0; i < 250; i++) {
      stars.push(
        new Star(
          Math.floor(Math.random() * (this.canvas.width)),
          Math.floor(Math.random() * (this.canvas.height)),
          Math.floor(Math.random() * (3 - 2)) + 2,
          Math.floor(Math.random() * (255 - 100)) + 100,
        ),
      );
    }
    const landScape = new Landscape(this.canvas.width / 2, this.canvas.height, this.canvas.width * 1.5, 200);
    const numberOfQuestions = 1;
    const quiz = QuizFactory.createQuiz(numberOfQuestions);
    // ToDo: remove FuelTank from core (is a UI concern), move quiz progression to Quiz
    const fuelTank = new FuelTank(30, 300, numberOfQuestions);
    const rocket = new Rocket(this._canvasWidth, this._canvasHeight)

    quiz.onRightAnswer(() => {
      this.state.fuelTank.addFuel();
    });
    quiz.onFalseAnswer(() => {
      this.state.fuelTank.removeFuel();
    });

    return new GameState(
      fuelTank,
      quiz,
      stars,
      landScape,
      rocket
    );
  }

  draw(): void {
    this.drawer.draw();
  }

  keyDown(s: p5): void {
    if (s.keyIsDown(KeyCode.LEFT_ARROW)) {
      this.state.rocket.goLeft();
    }
    if (s.keyIsDown(KeyCode.UP_ARROW)) {
      this.state.rocket.goUp();
    }
    if (s.keyIsDown(KeyCode.RIGHT_ARROW)) {
      this.state.rocket.goRight();
    }
    if (s.keyIsDown(KeyCode.DOWN_ARROW)) {
      this.state.rocket.goDown();
    }
  }

  keyPressed(s: p5) {
    if (s.keyCode === KeyCode.ENTER && this.state.givenAnswer.length > 0) {
      this.state.quiz.submitAnswer(this.state.givenAnswer.join(''));
      if (this.state.quiz.finished) {
        this.state.isLevelFinished = true;
      } else {
        this.state.quiz.nextQuestion();
      }
      this.state.givenAnswer = [];
    }

    if (s.keyCode === KeyCode.BACKSPACE) {
      this.state.givenAnswer.pop();
    }

    if (this.state.givenAnswer.length === 2) {
      return;
    }

    if (s.keyCode >= 48 && s.keyCode <= 57 || s.keyCode >= 96 && s.keyCode <= 105) {
      this.state.givenAnswer.push(s.key.toString());
    }
  }

  canvasWidth(): number {
    return this.canvas.width;
  }

  canvasHeight(): number {
    return this.canvas.height;
  }

  update(timeElapsed: number) {
    this.state.rocket.update(timeElapsed);
    // ToDo: implement for each object with state
  }
}