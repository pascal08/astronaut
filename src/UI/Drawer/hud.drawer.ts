import * as p5 from 'p5';
import { Drawer } from '../drawer.abstract';
import { GameState } from '../../Application/game-state';
import { Map } from '../../Core/Space/map';
import { RocketInterface } from '../../Core/Rocket/rocket.interface';

export class HudDrawer extends Drawer {
  private p5: p5;
  private map: Map;
  private rocket: RocketInterface;

  constructor(rocket: RocketInterface, map: Map, p5: p5) {
    super();
    this.rocket = rocket;
    this.map = map;
    this.p5 = p5;
  }

  draw(state: GameState): void {
    this.p5.translate(10, 10);

    this.p5.fill('black');
    this.p5.stroke('white');
    this.p5.strokeWeight(1);
    // this.p5.noFill();
    this.p5.rect(0, 0, 120, 80);

    this.drawRocket();
    this.drawRegions();
  }

  private drawRocket() {
    let activeRegion = this.map.activeRegion();

    let xRocket = this.p5.map(
      this.rocket.offsetX() - activeRegion.space().width / 2,
      0,
      activeRegion.space().width,
      0,
      120 / this.map.verticalSpaceRegions(),
    );
    let yRocket = this.p5.map(
      this.rocket.offsetY() - activeRegion.space().height / 2,
      0,
      activeRegion.space().height,
      0,
      80 / this.map.verticalSpaceRegions(),
    );

    let xRegion = this.p5.map(
      activeRegion.location().x,
      0,
      this.map.mapWidth(),
      0,
      120,
    );
    let yRegion = this.p5.map(
      activeRegion.location().y,
      0,
      this.map.mapWidth(),
      0,
      120,
    );

    this.p5.fill('white');
    this.p5.circle(xRocket + xRegion, yRocket + yRegion, 2);
  }

  private drawRegions() {
    let translated = false;
    for (const region of this.map.regions()) {
      this.p5.stroke('white');
      this.p5.strokeWeight(1);
      this.p5.noFill();

      let x = this.p5.map(
        region.location().x,
        0,
        this.map.mapWidth(),
        0,
        120,
      );

      let y = this.p5.map(
        region.location().y,
        0,
        this.map.mapHeight(),
        0,
        80,
      );

      let regionWidth = 120 / this.map.horizontalSpaceRegions();
      let regionHeight = 80 / this.map.verticalSpaceRegions();
      if (!translated) {
        this.p5.translate(-regionWidth / 2, -regionHeight / 2);
        translated = true;
      }
      this.p5.rect(
        x,
        y,
        regionWidth,
        regionHeight,
      );
    }
  }
}