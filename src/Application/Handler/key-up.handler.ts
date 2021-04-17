import { GameState } from '../game-state';
import { KeyUpCommand } from '../Command/key-up.command';

export class KeyUpHandler {
  handle(command: KeyUpCommand) {
    let gameState = GameState.getInstance();
    gameState.rocket.goUp();
  }
}