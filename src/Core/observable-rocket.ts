import { ObservableInterface } from './observable.interface';
import { Rocket } from './rocket';
import { ObserverInterface } from './observer.interface';
import { Planet } from './planet';
import { RocketInterface } from './rocket.interface';
import { VectorInterface } from './vector.interface';
import { Observable } from './observable';

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

  speed(): VectorInterface {
    return this.rocket.speed();
  }

  distanceToNearestPlanet(): number {
    return this.rocket.distanceToNearestPlanet();
  }

  planets(): Array<Planet> {
    return this.rocket.planets();
  }
}