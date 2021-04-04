import * as p5 from 'p5';
import { QuizDrawer } from './drawers/quiz.drawer';
import { LandscapeDrawer } from './drawers/landscape.drawer';
import { StarDrawer } from './drawers/star.drawer';
import { GameState } from '../Application/game-state';
import { Canvas } from '../Core/canvas';
import { RocketDrawer } from './drawers/rocket.drawer';
import { Drawer as DrawerAbstract } from './drawer.abstract';
import { PlanetDrawer } from './drawers/planet.drawer';

export class Drawer {

  private drawers: Map<string, DrawerAbstract> = new Map();
  private state: GameState;
  private p5: p5;
  private canvas: Canvas;

  constructor(
    state: GameState,
    p5: p5,
    canvas: Canvas,
  ) {
    this.state = state;
    this.p5 = p5;
    this.canvas = canvas;

    this.drawers.set('star', new StarDrawer(this.canvas, this.p5));
    this.drawers.set('planet', new PlanetDrawer(this.state.rocket.planets, this.p5));
    this.drawers.set('landScape', new LandscapeDrawer(this.canvas, this.p5));
    this.drawers.set('quiz', new QuizDrawer(this.state.quiz, this.p5, this.canvas));
    this.drawers.set('rocket', new RocketDrawer(this.state.rocket, this.p5));
  }

  draw(): void {
    let planet = this.state.rocket.onPlanet();
    if (this.state.isLevelFinished) {
      this.drawers.get('star')?.enable();
      this.drawers.get('rocket')?.enable();
      this.drawers.get('planet')?.enable();

      this.drawers.get('landScape')?.disable();
      this.drawers.get('fuelTank')?.disable();
      this.drawers.get('quiz')?.disable();
    } else {
      if (planet) {
        if (planet.name === 'earth') {
          this.drawers.get('star')?.enable();
          this.drawers.get('landScape')?.enable();
          this.drawers.get('fuelTank')?.enable();
          this.drawers.get('quiz')?.enable();

          this.drawers.get('rocket')?.disable();
          this.drawers.get('planet')?.disable();
        }
      } else {
        this.drawers.get('star')?.enable();
        this.drawers.get('rocket')?.enable();
        this.drawers.get('planet')?.enable();

        this.drawers.get('landScape')?.disable();
        this.drawers.get('fuelTank')?.disable();
        this.drawers.get('quiz')?.disable();
      }
    }

    this.drawers.forEach((drawer) => {
      this.p5.push();
      drawer.doDraw(this.state);
      this.p5.pop();
    });
  }
}