import { GameState } from '../Application/game-state';
import { Planet } from './planet';
import { Location } from './location';

interface Vector {
  x: number;
  y: number;
}

export class Rocket {
  private readonly _forwardThrottleFactor = 0.1;

  private readonly _reverseTrustFactor = 0.05;

  /**
   * This factor determines the sensitivity of steering the
   * rocket through space. The lower the factor the more
   * sensitive the steering will be.
   */
  private readonly _directionalSensitivityFactor = 20;

  /**
   * This factor determines the rate at which the speed of
   * the rocket will decay per time unit.
   */
  private readonly _speedDecayFactor = 0.01;

  private _speed: number;
  private _angle: number;
  private _scale: number = 0.5;

  private _location: Location;

  private spaceWidth: number;

  private spaceHeight: number;
  private _onPlanet: Planet | null;

  public _distanceToNearestPlanet: number = Infinity;

  constructor(spaceWidth: number, spaceHeight: number) {
    this.spaceWidth = spaceWidth;
    this.spaceHeight = spaceHeight;
    this._location = new Location(
      spaceWidth / 2,
      spaceHeight / 2,
      0,
      this.spaceWidth,
      0,
      this.spaceHeight
    );
    this._angle = 0;
    this._speed = 1;
    this._onPlanet = null;
  }

  goLeft(): void {
    this._angle -= this._speed / this._directionalSensitivityFactor;
  }

  goRight(): void {
    this._angle += this._speed / this._directionalSensitivityFactor;
  }

  goUp(): void {
    this._speed += this._forwardThrottleFactor;

    if (this._speed > 2) {
      this._speed = 2;
    }
  }

  goDown(): void {
    this._speed -= this._reverseTrustFactor;

    if (this._speed < -1) {
      this._speed = -1;
    }
  }

  drift(): void {
    const {x, y} = this.speed();

    this.adjustOffsetX(x);
    this.adjustOffsetY(-y);
  }

  private adjustOffsetX(dx: number): void {
    let newX = this._location.x + dx;

    this._location = this._location.update(newX, this._location.y);
  }

  private adjustOffsetY(dy: number): void {
    let newY = this._location.y + dy;

    this._location = this._location.update(this._location.x, newY);
  }

  private speed(): Vector {
    const x = Math.sin(this._angle) * this._speed;
    const y = Math.cos(this._angle) * this._speed;
    return {x, y};
  }

  offsetX(): number {
    return this._location.x;
  }

  offsetY(): number {
    return this._location.y;
  }

  angle(): number {
    return this._angle;
  }

  scale(): number {
    return this._scale;
  }

  update(state: GameState): void {
    this.drift();

    this.updateHasLanded(state.planets);
    this.updateDistanceToNearestPlanet(state.planets);

  }

  private updateDistanceToNearestPlanet(planets: Array<Planet>): void {
    let smallestDistance = Infinity;
    for (let planet of planets) {
      let distanceX = Math.abs(planet.location().x - this._location.x);
      let distanceY = Math.abs(planet.location().y - this._location.y);
      let distanceToCore = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
      let distanceToSurface = distanceToCore - planet.radius();

      if (distanceToSurface < smallestDistance) {
        smallestDistance = distanceToSurface;
      }
    }
    this._distanceToNearestPlanet = smallestDistance;

    const mappedDistance = (this._distanceToNearestPlanet) / (50) * (0.5 - 0.1) + 0.1;
    this._scale = Math.max(Math.min(mappedDistance, 0.5), 0.1);
  }

  private updateHasLanded(planets: Array<Planet>) {
    this._onPlanet = null;
    for (let planet of planets) {
      let distanceX = Math.abs(planet.location().x - this._location.x);
      let distanceY = Math.abs(planet.location().y - this._location.y);
      let distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));

      if (distance < planet.radius()) {
        this._onPlanet = planet;
      }
    }
  }

  onPlanet(): Planet | null {
    return this._onPlanet;
  }
}