import * as p5 from 'p5';
import { Canvas } from '../Core/canvas';
import { GameState } from './game-state';
import { Drawer } from '../UI/drawer';
import { GameStateFactory } from './game-state.factory';
import { Assets } from '../index';

export class Game {

  private state: GameState;
  private drawer: Drawer;

  private readonly _canvasWidth = 600;
  private readonly _canvasHeight = 400;
  private canvas: Canvas;

  constructor(p5: p5, assets: Assets) {
    this.canvas = new Canvas(this._canvasWidth, this._canvasHeight);

    this.state = GameStateFactory.create(this.canvas);

    this.drawer = new Drawer(
      this.state,
      p5,
      this.canvas,
      assets,
    );
  }

  draw(): void {
    this.drawer.draw();
  }

  handleKeyDown() {
    this.state.rocket.goDown();
  }

  handleKeyUp() {
    this.state.rocket.goUp();
  }

  handleKeyLeft() {
    this.state.rocket.goLeft();
  }

  handleKeyRight() {
    this.state.rocket.goRight();
  }

  handleEnter() {
    this.state.quiz.submitAnswer();
  }

  handleBackspace() {
    this.state.quiz.removeFromAnswer();
  }

  handleNumber(digit: string) {
    this.state.quiz.addToAnswer(digit);
  }

  canvasWidth(): number {
    return this.canvas.width;
  }

  canvasHeight(): number {
    return this.canvas.height;
  }

  onTick(): void {
    if (this.state.quiz.finished) {
      this.state.rocket.update();
      this.state.currentPlanet = this.state.rocket.onPlanet();
      if (this.state.currentPlanet) {
        this.state = GameStateFactory.resetQuiz(this.state);
      }
    }
  }
}