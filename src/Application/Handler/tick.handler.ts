import { GameState } from '../game-state';
import { TickCommand } from '../Command/tick.command';

export class TickHandler {
  handle(command: TickCommand) {
    let gameState = GameState.getInstance();

    // console.log(gameState.quiz.finished);

    if (gameState.isQuizFinished()) {
      // gameState.leavePlanet();
      // gameState.resetQuiz();
      gameState.rocket.update();
      // return;
    }
    // console.log(gameState.currentPlanet);

    // if (gameState.onPlanet) {
    //   console.log('here');
    //   return;
    // }
  }
}