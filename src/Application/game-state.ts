import { QuizFactory } from '../Core/quiz.factory';
import { Rocket } from '../Core/rocket';
import { Quiz } from '../Core/quiz';
import { Game } from './game';
import { ObservableRocket } from '../Core/observable-rocket';
import { RocketLandedObserver } from './Observers/rocket-landed.observer';
import { Planet } from '../Core/planet';
import { RocketInterface } from '../Core/rocket.interface';

export class GameState {

  public readonly rocket: RocketInterface;
  public quiz: Quiz;
  public onPlanet: Planet | null;

  private static instance: GameState;

  private static readonly _numberOfQuestions = 100;
  private static readonly _finishScore = 2;

  private constructor(
    quiz: Quiz,
    rocket: RocketInterface,
  ) {
    this.rocket = rocket;
    this.quiz = quiz;
    this.onPlanet = null;
  }

  public static getInstance(): GameState {
    if (!GameState.instance) {
      let rocket = new Rocket(
        Game._canvasWidth,
        Game._canvasHeight,
      );
      let quiz = GameState.createQuiz();

      let rocketLandedObserver = new RocketLandedObserver();

      let observableRocket = new ObservableRocket(
        rocket
      );
      observableRocket.subscribe(
        rocketLandedObserver
      );

      GameState.instance = new GameState(
        quiz,
        observableRocket,
      );
    }

    return GameState.instance;
  }

  startNewQuiz() {
    this.quiz = GameState.createQuiz();
  }

  isQuizFinished() {
    return this.quiz.finished;
  }

  private static createQuiz() {
    return QuizFactory.createQuiz(this._numberOfQuestions, this._finishScore);
  }
}