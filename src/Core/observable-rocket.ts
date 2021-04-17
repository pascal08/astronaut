import { ObservableInterface } from './observable.interface';
import { Rocket } from './rocket';
import { ObserverInterface } from './observer.interface';
import { Planet } from './planet';
import { RocketInterface } from './rocket.interface';
import { VectorInterface } from './vector.interface';

export class ObservableRocket implements RocketInterface, ObservableInterface {
  private rocket: Rocket;
  private observers: Array<ObserverInterface>;

  constructor(rocket: Rocket) {
    this.rocket = rocket;
    this.observers = [];
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

  drift(): void {
    this.rocket.drift();
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
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  subscribe(observer: ObserverInterface): void {
    const exists = this.observers.includes(observer);
    if (exists) {
      return;
    }

    this.observers.push(observer);
  }

  unsubscribe(observer: ObserverInterface): void {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      return;
    }

    this.observers.splice(index, 1);
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