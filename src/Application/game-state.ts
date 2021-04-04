import { Quiz } from '../Core/quiz';
import { Rocket } from '../Core/rocket';

export class GameState {

  public readonly rocket: Rocket;
  public readonly quiz: Quiz;
  public givenAnswer: Array<string>;
  public isLevelFinished: boolean;

  constructor(
    quiz: Quiz,
    rocket: Rocket,
  ) {
    this.rocket = rocket;
    this.isLevelFinished = false;
    this.quiz = quiz;
    this.givenAnswer = [];
  }
}