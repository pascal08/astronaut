import { GameState } from '../game-state';
import { KeyNumericCommand } from '../Command/key-numeric.command';

export class KeyNumericHandler {
  handle(command: KeyNumericCommand) {
    let gameState = GameState.getInstance();
    gameState.quiz.addToAnswer(command.digit);
  }
}