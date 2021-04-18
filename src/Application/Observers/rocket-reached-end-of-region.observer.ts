import { ObserverInterface } from '../../Core/observer.interface';
import { ObservableInterface } from '../../Core/observable.interface';
import { GameState } from '../game-state';
import { Game } from '../game';

export class RocketReachedEndOfRegionObserver implements ObserverInterface {
  update(observable: ObservableInterface): void {
    let gameState = GameState.getInstance();
    if (gameState.rocket.offsetX() >= Game._canvasWidth) {
      if (gameState.map.moveToEastRegion()) {
        gameState.rocket.moveToEastRegion();
      }
    }
    if (gameState.rocket.offsetX() <= 0) {
      if (gameState.map.moveToWestRegion()) {
        gameState.rocket.moveToWestRegion();
      }
    }
    if (gameState.rocket.offsetY() >= Game._canvasHeight) {
      if (gameState.map.moveToSouthRegion()) {
        gameState.rocket.moveToSouthRegion();
      }
    }
    if (gameState.rocket.offsetY() <= 0) {
      if (gameState.map.moveToNorthRegion()) {
        gameState.rocket.moveToNorthRegion();
      }
    }
  }

}