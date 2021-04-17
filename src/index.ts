import * as p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import { Game } from './Application/game';
import { KeyCode } from './Application/key-code.enum';
import { KeyDownCommand } from './Application/Command/key-down.command';
import { KeyRightCommand } from './Application/Command/key-right.command';
import { KeyUpCommand } from './Application/Command/key-up.command';
import { KeyLeftCommand } from './Application/Command/key-left.command';
import { EnterCommand } from './Application/Command/enter.command';
import { BackspaceCommand } from './Application/Command/backspace.command';
import { KeyNumericCommand } from './Application/Command/key-numeric.command';
import { TickCommand } from './Application/Command/tick.command';

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
      game.handleCommand(
        new KeyLeftCommand()
      );
    }
    if (s.keyIsDown(KeyCode.UP_ARROW)) {
      game.handleCommand(
        new KeyUpCommand()
      );
    }
    if (s.keyIsDown(KeyCode.RIGHT_ARROW)) {
      game.handleCommand(
        new KeyRightCommand()
      );
    }
    if (s.keyIsDown(KeyCode.DOWN_ARROW)) {
      game.handleCommand(
        new KeyDownCommand()
      );
    }

    game.handleCommand(
      new TickCommand()
    );
    game.draw();
  };

  s.keyPressed = () => {
    if (s.keyCode === KeyCode.ENTER) {
      game.handleCommand(
        new EnterCommand()
      );
    }

    if (s.keyCode === KeyCode.BACKSPACE) {
      game.handleCommand(
        new BackspaceCommand()
      );
    }

    if (s.keyCode >= 48 && s.keyCode <= 57 || s.keyCode >= 96 && s.keyCode <= 105) {
      game.handleCommand(
        new KeyNumericCommand(s.key)
      );
    }
  };
};

new p5(s);
