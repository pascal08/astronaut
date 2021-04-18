import { QuizFactory } from '../Core/Quiz/quiz.factory';
import { Game } from './game';
import { RocketLandedObserver } from './Observers/rocket-landed.observer';
import { Planet } from '../Core/planet';
import { ObservableQuiz } from '../Core/Quiz/observable-quiz';
import { QuizFinishedObserver } from './Observers/quiz-finished.observer';
import { QuizInterface } from '../Core/Quiz/quiz.interface';
import { QuizDrawer } from '../UI/Drawer/quiz.drawer';
import { RocketInterface } from '../Core/Rocket/rocket.interface';
import { ObservableRocket } from '../Core/Rocket/observable-rocket';
import { Rocket } from '../Core/Rocket/rocket';

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
        GameState.createRocket(),
      );
    }

    return GameState.instance;
  }

  startNewQuiz() {
    GameState.instance.quiz = GameState.createQuiz();
    GameState.instance.quiz.start();
  }

  isQuizFinished() {
    return GameState.instance.quiz.isFinished();
  }

  rocketTakeOff() {
    GameState.instance.rocket.takeOff();
  }

  private static createRocket() {
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

    observableQuiz.subscribe(new QuizFinishedObserver());

    return observableQuiz;
  }

  isQuizStarted(): boolean {
    return GameState.instance.quiz.isStarted();
  }
}