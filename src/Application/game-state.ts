import { QuizFactory } from '../Core/quiz.factory';
import { Rocket } from '../Core/rocket';
import { Quiz } from '../Core/quiz';
import { Game } from './game';
import { ObservableRocket } from '../Core/observable-rocket';
import { RocketLandedObserver } from './Observers/rocket-landed.observer';
import { Planet } from '../Core/planet';
import { RocketInterface } from '../Core/rocket.interface';
import { ObservableQuiz } from '../Core/observable-quiz';
import { QuizFinishedObserver } from './Observers/quiz-finished.observer';
import { QuizInterface } from '../Core/quiz.interface';

export class GameState {

  public readonly rocket: RocketInterface;
  public quiz: QuizInterface;
  public onPlanet: Planet | null;

  private static instance: GameState;

  private static readonly _numberOfQuestions = 100;
  private static readonly _finishScore = 2;

  private constructor(
    quiz: QuizInterface,
    rocket: RocketInterface,
  ) {
    this.rocket = rocket;
    this.quiz = quiz;
    this.onPlanet = null;
  }

  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState(
        GameState.createQuiz(),
        GameState.createRocker(),
      );
    }

    return GameState.instance;
  }

  startNewQuiz() {
    GameState.instance.quiz = GameState.createQuiz();
  }

  isQuizFinished() {
    return GameState.instance.quiz.isFinished();
  }

  rocketTakeOff() {
    let planet = GameState.instance.rocket.onPlanet();

    console.log(planet);
  }

  private static createRocker() {
    let rocket = new Rocket(
      Game._canvasWidth,
      Game._canvasHeight,
    );

    let observableRocket = new ObservableRocket(
      rocket,
    );

    let rocketLandedObserver = new RocketLandedObserver();
    observableRocket.subscribe(
      rocketLandedObserver,
    );
    return observableRocket;
  }

  private static createQuiz(): QuizInterface {
    let quiz = QuizFactory.createQuiz(this._numberOfQuestions, this._finishScore);

    let observableQuiz = new ObservableQuiz(
      quiz,
    );

    let quizFinishedObserver = new QuizFinishedObserver();
    observableQuiz.subscribe(
      quizFinishedObserver,
    );

    return observableQuiz;
  }
}