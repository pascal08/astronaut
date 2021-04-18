import { RocketInterface } from './rocket.interface';
import { Location } from '../location';
import { Planet } from '../planet';
import { VectorInterface } from '../vector.interface';

export class Rocket implements RocketInterface {
  /**
   * This factor determines the sensitivity of steering the
   * rocket through space. The lower the factor the more
   * sensitive the steering will be.
   */
  private readonly _directionalSensitivityFactor = 20;
  private readonly _forwardThrottleFactor = 0.1;
  private readonly _reverseTrustFactor = 0.05;
  private readonly _minSpeed = -1;
  private readonly _maxSpeed = 2;

  private _speed: number;
  private _angle: number;
  private _scale: number = 0.5;

  private spaceWidth: number;
  private spaceHeight: number;

  private _location: Location;
  private _onPlanet: Planet | null;
  private _distanceToNearestPlanet: number = Infinity;

  private readonly _planets: Array<Planet> = [];

  constructor(spaceWidth: number, spaceHeight: number) {
    this.spaceWidth = spaceWidth;
    this.spaceHeight = spaceHeight;
    this._location = new Location(
      spaceWidth / 2,
      spaceHeight / 2,
      0,
      this.spaceWidth,
      0,
      this.spaceHeight,
    );
    this._angle = 0;
    this._speed = 0;
    this._onPlanet = null;

    this._planets.push(
      new Planet(
        new Location(200, 100),
        30,
      ),
    );
    this._planets.push(
      new Planet(
        new Location(500, 300),
        20,
      ),
    );
  }

  goLeft(): void {
    this._angle = (this._angle - this._speed / this._directionalSensitivityFactor) % (2 * Math.PI);
  }

  goRight(): void {
    this._angle = (this._angle + this._speed / this._directionalSensitivityFactor) % (2 * Math.PI);
  }

  goUp(): void {
    this._speed += this._forwardThrottleFactor;

    if (this._speed > this._maxSpeed) {
      this._speed = this._maxSpeed;
    }
  }


  goDown(): void {
    this._speed -= this._reverseTrustFactor;

    if (this._speed < this._minSpeed) {
      this._speed = this._minSpeed;
    }
  }

  private drift(): void {
    const {x, y} = this.speedVector();

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

  minSpeed(): number {
    return this._minSpeed;
  }

  maxSpeed(): number {
    return this._maxSpeed;
  }

  speed(): number {
    return this._speed;
  }

  speedVector(): VectorInterface {
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

  update(): void {
    this.drift();

    this.updateHasLanded(this._planets);
    this.updateDistanceToNearestPlanet(this._planets);
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

    const mappedDistance = this._distanceToNearestPlanet / 50 * 0.5;
    this._scale = Math.max(Math.min(mappedDistance, 0.5), 0);
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

  takeOff(): void {
    if (!this._onPlanet) {
      return;
    }

    this._location = this._location.update(
      this._onPlanet.location().x,
      this._onPlanet.location().y - this._onPlanet.radius(),
    );
    this._onPlanet = null;
    this._angle = 0;
    this._speed = 0;
  }

  onPlanet(): Planet | null {
    return this._onPlanet;
  }

  distanceToNearestPlanet(): number {
    return this._distanceToNearestPlanet;
  }

  planets(): Array<Planet> {
    return this._planets;
  }
}