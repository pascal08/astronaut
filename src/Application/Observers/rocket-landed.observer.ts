import { ObserverInterface } from '../../Core/observer.interface';
import { ObservableInterface } from '../../Core/observable.interface';
import { GameState } from '../game-state';

export class RocketLandedObserver implements ObserverInterface {
  update(observable: ObservableInterface): void {
    let gameState = GameState.getInstance();
    console.log(gameState.rocket.onPlanet());
    console.log(gameState.isQuizFinished());
    if (gameState.rocket.onPlanet() !== null && gameState.isQuizFinished()) {
      gameState.startNewQuiz();
    }
  }

}