import * as p5 from 'p5';
import { Drawer } from '../drawer.abstract';
import { Planet } from '../planet';
import { GameState } from '../../Application/game-state';
import { Assets } from '../../index';

export class PlanetDrawer extends Drawer {
  private planets: Array<Planet>;
  private p5: p5.p5InstanceExtensions;
  private assets: Assets;

  constructor(planets: Array<Planet>, p5: p5, assets: Assets) {
    super();
    this.assets = assets;
    this.planets = planets;
    this.p5 = p5;
  }

  draw(state: GameState): void {
    for (let i = 0; i < this.planets.length; i++) {
      const planet = this.planets[i];

      this.p5.translate(-planet.radius(), -planet.radius());
      this.p5.image(this.assets.images[planet.name], planet.location().x, planet.location().y, planet.radius() * 2, planet.radius() * 2);
    }
  }
}