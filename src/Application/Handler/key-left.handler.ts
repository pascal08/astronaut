import { GameState } from '../game-state';
import { KeyLeftCommand } from '../Command/key-left.command';

export class KeyLeftHandler {
  handle(command: KeyLeftCommand) {
    let gameState = GameState.getInstance();
    gameState.rocket.goLeft();
  }
}