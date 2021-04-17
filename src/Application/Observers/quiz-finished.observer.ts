import { ObserverInterface } from '../../Core/observer.interface';
import { ObservableInterface } from '../../Core/observable.interface';
import { GameState } from '../game-state';

export class QuizFinishedObserver implements ObserverInterface {
  update(observable: ObservableInterface): void {
    let gameState = GameState.getInstance();
    console.log(gameState.isQuizFinished());
    if (gameState.isQuizFinished()) {
      gameState.rocketTakeOff();
    }
  }

}