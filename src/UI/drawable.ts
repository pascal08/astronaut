import { GameState } from '../Application/game-state';

export interface Drawable {
  draw(state: GameState): void;
}