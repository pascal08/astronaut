import { RocketInterface } from './rocket.interface';
import { ObservableInterface } from '../observable.interface';
import { Observable } from '../observable';
import { Planet } from '../planet';
import { ObserverInterface } from '../observer.interface';
import { VectorInterface } from '../vector.interface';
import { Rocket } from './rocket';

export class ObservableRocket implements RocketInterface, ObservableInterface {
  private rocket: Rocket;
  private observable: ObservableInterface;

  constructor(rocket: Rocket) {
    this.rocket = rocket;
    this.observable = new Observable();
  }

  goLeft(): void {
    this.rocket.goLeft();
  }

  goRight(): void {
    this.rocket.goRight();
  }

  goUp(): void {
    this.rocket.goUp();
  }

  goDown(): void {
    this.rocket.goDown();
  }

  takeOff(): void {
    this.rocket.takeOff();
  }

  offsetX(): number {
    return this.rocket.offsetX();
  }

  offsetY(): number {
    return this.rocket.offsetY();
  }

  angle(): number {
    return this.rocket.angle();
  }

  scale(): number {
    return this.rocket.scale();
  }

  update(): void {
    this.rocket.update();

    if (this.rocket.onPlanet()) {
      this.publish();
    }
  }

  onPlanet(): Planet | null {
    return this.rocket.onPlanet();
  }

  publish(): void {
    this.observable.publish();
  }

  subscribe(observer: ObserverInterface): void {
    this.observable.subscribe(observer);
  }

  unsubscribe(observer: ObserverInterface): void {
    this.observable.unsubscribe(observer);
  }

  minSpeed(): number {
    return this.rocket.minSpeed();
  }

  maxSpeed(): number {
    return this.rocket.maxSpeed();
  }

  speed(): number {
    return this.rocket.speed();
  }

  speedVector(): VectorInterface {
    return this.rocket.speedVector();
  }

  distanceToNearestPlanet(): number {
    return this.rocket.distanceToNearestPlanet();
  }

  planets(): Array<Planet> {
    return this.rocket.planets();
  }
}