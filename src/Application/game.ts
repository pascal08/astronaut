import * as p5 from 'p5';
import { Canvas } from '../Core/canvas';
import { GameState } from './game-state';
import { Drawer } from '../UI/drawer';
import { KeyCode } from './key-code.enum';
import { GameStateFactory } from './game-state.factory';

export class Game {

  private state: GameState;
  private drawer: Drawer;

  private readonly _canvasWidth = 600;
  private readonly _canvasHeight = 400;
  private canvas: Canvas;

  constructor(p5: p5) {
    this.canvas = new Canvas(this._canvasWidth, this._canvasHeight);

    this.state = GameStateFactory.create(this.canvas);

    this.drawer = new Drawer(
      this.state,
      p5,
      this.canvas,
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

  keyPressed(s: p5): void {
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

  update(): void {
    this.state.rocket.update(this.state);
  }
}