import { FuelTank } from '../Core/fuel-tank';
import { Quiz } from '../Core/quiz';
import { Star } from '../Core/star';
import { Landscape } from '../Core/landscape';
import { Rocket } from '../Core/rocket';
import { Planet } from '../Core/planet';

export class GameState {

  public readonly rocket: Rocket;
  public readonly quiz: Quiz;
  public readonly stars: Array<Star> = [];
  public readonly planets: Array<Planet> = [];
  public readonly landScape: Landscape;
  public givenAnswer: Array<string>;
  public isLevelFinished: boolean;

  constructor(
    quiz: Quiz,
    stars: Array<Star>,
    planets: Array<Planet>,
    landScape: Landscape,
    rocket: Rocket
  ) {
    this.rocket = rocket;
    this.isLevelFinished = false;
    this.quiz = quiz;
    this.stars = stars;
    this.planets = planets;
    this.landScape = landScape;
    this.givenAnswer = [];
  }
}