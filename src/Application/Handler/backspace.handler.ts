import { GameState } from '../game-state';
import { BackspaceCommand } from '../Command/backspace.command';

export class BackspaceHandler {
  handle(command: BackspaceCommand) {
    let gameState = GameState.getInstance();
    gameState.quiz.removeFromAnswer();
  }
}