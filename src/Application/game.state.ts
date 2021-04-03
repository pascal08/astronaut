import { FuelTank } from '../Core/fuel-tank';
import { Quiz } from '../Core/quiz';
import { Star } from '../Core/star';
import { Landscape } from '../Core/landscape';
import { Rocket } from '../Core/rocket';

export class GameState {

  public readonly fuelTank: FuelTank;
  public readonly rocket: Rocket;
  public readonly quiz: Quiz;
  public readonly stars: Array<Star> = [];
  public readonly landScape: Landscape;
  public givenAnswer: Array<string>;
  public isLevelFinished: boolean;

  constructor(fuelTank: FuelTank, quiz: Quiz, stars: Array<Star>, landScape: Landscape, rocket: Rocket) {
    this.rocket = rocket;
    this.isLevelFinished = false;
    this.fuelTank = fuelTank;
    this.quiz = quiz;
    this.stars = stars;
    this.landScape = landScape;
    this.givenAnswer = [];
  }
}