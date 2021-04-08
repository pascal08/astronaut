import { QuizFactory } from '../Core/quiz.factory';
import { Rocket } from '../Core/rocket';
import { GameState } from './game-state';
import { Canvas } from '../Core/canvas';

export class GameStateFactory {

  private static _numberOfQuestions = 1;
  private static _finishScore = 1;

  static create(canvas: Canvas): GameState {
    const quiz = QuizFactory.createQuiz(this._numberOfQuestions, this._finishScore);
    const rocket = new Rocket(canvas.width, canvas.height)

    const state = new GameState(
      quiz,
      rocket
    );

    return state;
  }

  static resetQuiz(state: GameState) {
    let quiz = QuizFactory.createQuiz(this._numberOfQuestions, this._finishScore);
    return new GameState(
      quiz,
      state.rocket
    );
  }
}