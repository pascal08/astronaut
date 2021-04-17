import { GameState } from '../game-state';
import { TickCommand } from '../Command/tick.command';

export class TickHandler {
  handle(command: TickCommand) {
    let gameState = GameState.getInstance();

    if (!gameState.isQuizStarted() || gameState.isQuizFinished()) {
      // gameState.leavePlanet();
      // gameState.resetQuiz();
      gameState.rocket.update();
      // return;
    }
    // if (gameState.onPlanet) {
    //   return;
    // }
  }
}