import { GameState } from '../game-state';
import { KeyDownCommand } from '../Command/key-down.command';

export class KeyDownHandler {
  handle(command: KeyDownCommand) {
    let gameState = GameState.getInstance();
    gameState.rocket.goDown();
  }
}