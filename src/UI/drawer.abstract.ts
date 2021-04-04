import { Togglable } from './togglable.interface';
import { Drawable } from './drawable';
import { GameState } from '../Application/game-state';

export abstract class Drawer implements Togglable, Drawable {
  private isEnabled = false;

  doDraw(state: GameState): void {
    if (this.isEnabled) {
      this.draw(state);
    }
  }

  abstract draw(state: GameState): void;

  disable(): void {
    this.isEnabled = false;
  }

  enable(): void {
    this.isEnabled = true;
  }
}