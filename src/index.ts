import * as p5 from 'p5';
import 'p5/lib/addons/p5.dom';
import { Game } from './Application/game';

const s = (s: any) => {
  const game = new Game(s);

  const frameRate = 60;

  s.setup = () => {
    s.createCanvas(game.canvasWidth(), game.canvasHeight());

    s.noStroke();
    s.background(0);
    s.frameRate(frameRate);
  };

  s.draw = () => {
    s.clear();
    s.background(0);

    game.keyDown(s);

    game.update();
    game.draw();
  };

  s.keyPressed = () => {
    game.keyPressed(s);
  };
};

new p5(s);
