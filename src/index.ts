import * as p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import { Game } from './Application/game';
import { KeyCode } from './Application/key-code.enum';

export interface Assets {
  'images': { [key: string]: p5.Image }
}

const s = (s: p5) => {
  const assets: Assets = {
    'images': {}
  };

  const game = new Game(s, assets);

  const frameRate = 60;

  s.preload = () => {
    assets.images.earth = s.loadImage("earth.png");
  };

  s.setup = () => {
    s.createCanvas(game.canvasWidth(), game.canvasHeight());

    s.noStroke();
    s.background(0);
    s.frameRate(frameRate);
  };

  s.draw = () => {
    s.clear();
    s.background(0);

    if (s.keyIsDown(KeyCode.LEFT_ARROW)) {
      game.handleKeyLeft();
    }
    if (s.keyIsDown(KeyCode.UP_ARROW)) {
      game.handleKeyUp();
    }
    if (s.keyIsDown(KeyCode.RIGHT_ARROW)) {
      game.handleKeyRight();
    }
    if (s.keyIsDown(KeyCode.DOWN_ARROW)) {
      game.handleKeyDown();
    }

    game.onTick();
    game.draw();
  };

  s.keyPressed = () => {
    if (s.keyCode === KeyCode.ENTER) {
      game.handleEnter();
    }

    if (s.keyCode === KeyCode.BACKSPACE) {
      game.handleBackspace();
    }

    if (s.keyCode >= 48 && s.keyCode <= 57 || s.keyCode >= 96 && s.keyCode <= 105) {
      game.handleNumber(s.key);
    }
  };
};

new p5(s);
