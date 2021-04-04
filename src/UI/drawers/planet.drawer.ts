import * as p5 from 'p5';
import { Drawer } from '../drawer.abstract';
import { Planet } from '../../Core/planet';
import { GameState } from '../../Application/game-state';

export class PlanetDrawer extends Drawer {
  private planets: Array<Planet>;
  private p5: p5.p5InstanceExtensions;

  constructor(planets: Array<Planet>, p5: p5) {
    super();
    this.planets = planets;
    this.p5 = p5;
  }

  draw(state: GameState): void {
    this.p5.noStroke();
    for (let i = 0; i < this.planets.length; i++) {
      const planet = this.planets[i];

      this.p5.fill('#53a78c');
      this.p5.circle(planet.location().x, planet.location().y, planet.radius());
    }
  }
}