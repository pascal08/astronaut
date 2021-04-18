import { Planet } from './planet';
import { VectorInterface } from './vector.interface';

export interface RocketInterface {
  goLeft(): void;

  goRight(): void;

  goUp(): void;

  goDown(): void;

  speed(): number;

  minSpeed(): number;

  maxSpeed(): number;

  speedVector(): VectorInterface;

  offsetX(): number;

  offsetY(): number;

  angle(): number;

  scale(): number;

  update(): void;

  onPlanet(): Planet | null;

  distanceToNearestPlanet(): number;

  planets(): Array<Planet>;

  takeOff(): void;
}