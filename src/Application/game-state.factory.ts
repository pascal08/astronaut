import { Star } from '../Core/star';
import { Planet } from '../Core/planet';
import { Location } from '../Core/location';
import { Landscape } from '../Core/landscape';
import { QuizFactory } from '../Core/quiz.factory';
import { Rocket } from '../Core/rocket';
import { GameState } from './game-state';
import { Canvas } from '../Core/canvas';

export class GameStateFactory {

  static create(canvas: Canvas): GameState {
    const stars: Array<Star> = [];
    for (let i = 0; i < 250; i++) {
      stars.push(
        new Star(
          Math.floor(Math.random() * (canvas.width)),
          Math.floor(Math.random() * (canvas.height)),
          Math.floor(Math.random() * (3 - 2)) + 2,
          Math.floor(Math.random() * (255 - 100)) + 100,
        ),
      );
    }
    const planets: Array<Planet> = [];
    planets.push(
      new Planet(
        new Location(200, 100),
        30,
      )
    );
    planets.push(
      new Planet(
        new Location(500, 300),
        20,
      ),
    );
    const landScape = new Landscape(canvas.width / 2, canvas.height, canvas.width * 1.5, 200);
    const numberOfQuestions = 1;
    const quiz = QuizFactory.createQuiz(numberOfQuestions);
    const rocket = new Rocket(canvas.width, canvas.height)

    const state = new GameState(
      quiz,
      stars,
      planets,
      landScape,
      rocket
    );

    return state;
  }
}