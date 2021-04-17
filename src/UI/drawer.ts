import * as p5 from 'p5';
import { QuizDrawer } from './Drawer/quiz.drawer';
import { StarDrawer } from './Drawer/star.drawer';
import { GameState } from '../Application/game-state';
import { Canvas } from '../Core/canvas';
import { RocketDrawer } from './Drawer/rocket.drawer';
import { Drawer as DrawerAbstract } from './drawer.abstract';
import { PlanetDrawer } from './Drawer/planet.drawer';
import { Assets } from '../index';

export class Drawer {

  private drawers: Map<string, DrawerAbstract> = new Map();
  private state: GameState;
  private p5: p5;
  private canvas: Canvas;

  constructor(
    p5: p5,
    canvas: Canvas,
    assets: Assets,
  ) {
    this.state = GameState.getInstance();
    this.p5 = p5;
    this.canvas = canvas;

    this.drawers.set('star', new StarDrawer(this.canvas, this.p5));
    this.drawers.set('planet', new PlanetDrawer(this.state.rocket.planets(), this.p5, assets));
    this.drawers.set('quiz', new QuizDrawer(this.state.quiz, this.p5, this.canvas, assets));
    this.drawers.set('rocket', new RocketDrawer(this.state.rocket, this.p5));
  }

  draw(): void {
    // this.p5.fill('white');
    // this.p5.textSize(6);
    // this.p5.text(JSON.stringify(this.state.quiz, null, 2), 0, 0);

    if (this.state.quiz.finished) {
      this.drawers.get('star')?.enable();
      this.drawers.get('rocket')?.enable();
      this.drawers.get('planet')?.enable();

      this.drawers.get('quiz')?.disable();
    } else {
      this.drawers.get('star')?.enable();
      this.drawers.get('quiz')?.enable();

      this.drawers.get('rocket')?.disable();
      this.drawers.get('planet')?.disable();
    }

    this.drawers.forEach((drawer) => {
      this.p5.push();
      drawer.doDraw(this.state);
      this.p5.pop();
    });
  }
}