import { GameState } from '../game-state';
import { EnterCommand } from '../Command/enter.command';

export class EnterHandler {
  handle(command: EnterCommand) {
    let gameState = GameState.getInstance();
    gameState.quiz.submitAnswer();
  }
}