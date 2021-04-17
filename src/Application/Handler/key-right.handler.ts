import { GameState } from '../game-state';
import { KeyRightCommand } from '../Command/key-right.command';

export class KeyRightHandler {
  handle(command: KeyRightCommand) {
    let gameState = GameState.getInstance();
    gameState.rocket.goRight();
  }
}