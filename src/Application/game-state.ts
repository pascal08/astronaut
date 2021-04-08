import { Quiz } from '../Core/quiz';
import { Rocket } from '../Core/rocket';
import { Planet } from '../UI/planet';

export class GameState {

  public readonly rocket: Rocket;
  public readonly quiz: Quiz;
  public currentPlanet: Planet|null;

  constructor(
    quiz: Quiz,
    rocket: Rocket,
  ) {
    this.rocket = rocket;
    this.quiz = quiz;
    this.currentPlanet = null;
  }
}