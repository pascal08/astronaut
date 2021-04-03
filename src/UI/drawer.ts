import * as p5 from 'p5';
import { CanvasOffset } from '../canvas-offset';
import { QuizDrawer } from './quiz.drawer';
import { LandscapeDrawer } from './landscape.drawer';
import { StarDrawer } from './star.drawer';
import { FuelTankDrawer } from './fuel-tank.drawer';
import { GameState } from '../Application/game.state';
import { Canvas } from '../Core/canvas';
import { RocketDrawer } from './rocket.drawer';

export class Drawer {

  public readonly fuelTankDrawer: FuelTankDrawer;
  public readonly landScapeDrawer: LandscapeDrawer;
  public readonly starDrawer: StarDrawer;
  public readonly quizDrawer: QuizDrawer;
  public readonly rocketDrawer: RocketDrawer;
  private state: GameState;
  private p5: p5;
  private canvas: Canvas;

  constructor(
    state: GameState,
    p5: p5,
    canvas: Canvas
  ) {
    this.state = state;
    this.p5 = p5;
    this.canvas = canvas;

    const canvasOffset = new CanvasOffset(50, (this.canvas.height - this.state.fuelTank.height) / 2);

    this.quizDrawer = new QuizDrawer(this.state.quiz, this.p5, this.canvas);
    this.landScapeDrawer = new LandscapeDrawer(this.state.landScape, this.p5);
    this.starDrawer = new StarDrawer(this.state.stars, this.p5);
    this.fuelTankDrawer = new FuelTankDrawer(this.state.fuelTank, canvasOffset, this.p5);
    this.rocketDrawer = new RocketDrawer(this.state.rocket, this.p5);
  }

  draw(): void {
    if (!this.state.isLevelFinished) {
      this.starDrawer.draw();
      this.landScapeDrawer.draw();
      this.fuelTankDrawer.draw();
      this.quizDrawer.draw(this.state);
    } else {
      this.starDrawer.draw();
      this.rocketDrawer.draw();
    }
  }
}