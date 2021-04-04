import { Planet } from '../UI/planet';
import { Location } from '../Core/location';
import { QuizFactory } from '../Core/quiz.factory';
import { Rocket } from '../Core/rocket';
import { GameState } from './game-state';
import { Canvas } from '../Core/canvas';

export class GameStateFactory {

  static create(canvas: Canvas): GameState {
    const numberOfQuestions = 1;
    const quiz = QuizFactory.createQuiz(numberOfQuestions);
    const rocket = new Rocket(canvas.width, canvas.height)

    const state = new GameState(
      quiz,
      rocket
    );

    return state;
  }
}