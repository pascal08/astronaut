import * as p5 from 'p5';
import { CanvasOffset } from '../canvas-offset';
import { QuizDrawer } from './drawers/quiz.drawer';
import { LandscapeDrawer } from './drawers/landscape.drawer';
import { StarDrawer } from './drawers/star.drawer';
import { FuelTankDrawer } from './drawers/fuel-tank.drawer';
import { GameState } from '../Application/game.state';
import { Canvas } from '../Core/canvas';
import { RocketDrawer } from './drawers/rocket.drawer';
import { Drawer as DrawerAbstract } from './drawer.abstract';

export class Drawer {

  private drawers: Map<string, DrawerAbstract> = new Map();
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

    this.drawers.set('star', new StarDrawer(this.state.stars, this.p5));
    this.drawers.set('landScape', new LandscapeDrawer(this.state.landScape, this.p5));
    this.drawers.set('fuelTank', new FuelTankDrawer(this.state.fuelTank, canvasOffset, this.p5));
    this.drawers.set('quiz', new QuizDrawer(this.state.quiz, this.p5, this.canvas));
    this.drawers.set('rocket', new RocketDrawer(this.state.rocket, this.p5));
  }

  draw(): void {
    if (!this.state.isLevelFinished) {
      this.drawers.get('star')?.enable();
      this.drawers.get('landScape')?.enable();
      this.drawers.get('fuelTank')?.enable();
      this.drawers.get('quiz')?.enable();

      this.drawers.get('rocket')?.disable();
    } else {
      this.drawers.get('star')?.enable();
      this.drawers.get('rocket')?.enable();

      this.drawers.get('landScape')?.disable();
      this.drawers.get('fuelTank')?.disable();
      this.drawers.get('quiz')?.disable();
    }

    this.drawers.forEach((drawer) => {
      this.p5.push();
      drawer.doDraw(this.state);
      this.p5.pop();
    });
  }
}