import * as p5 from 'p5';
import { Space } from '../Core/Space/space';
import { Drawer } from '../UI/drawer';
import { Assets } from '../index';
import { CommandInterface } from './command.interface';
import { KeyDownCommand } from './Command/key-down.command';
import { KeyRightCommand } from './Command/key-right.command';
import { KeyUpCommand } from './Command/key-up.command';
import { KeyLeftCommand } from './Command/key-left.command';
import { BackspaceCommand } from './Command/backspace.command';
import { EnterCommand } from './Command/enter.command';
import { KeyNumericCommand } from './Command/key-numeric.command';
import { KeyNumericHandler } from './Handler/key-numeric.handler';
import { EnterHandler } from './Handler/enter.handler';
import { BackspaceHandler } from './Handler/backspace.handler';
import { KeyUpHandler } from './Handler/key-up.handler';
import { KeyDownHandler } from './Handler/key-down.handler';
import { KeyRightHandler } from './Handler/key-right.handler';
import { KeyLeftHandler } from './Handler/key-left.handler';
import { TickHandler } from './Handler/tick.handler';
import { TickCommand } from './Command/tick.command';
import { Canvas } from '../UI/canvas';

export class Game {

  private drawer: Drawer;

  public static readonly _canvasWidth = 600;
  public static readonly _canvasHeight = 400;

  public static readonly _horizontalSpaceRegions = 4;
  public static readonly _verticalSpaceRegions = 4;

  constructor(p5: p5, assets: Assets) {
    this.drawer = new Drawer(
      p5,
      new Canvas(Game._canvasWidth, Game._canvasHeight),
      assets,
    );
  }

  draw(): void {
    this.drawer.draw();
  }

  canvasWidth(): number {
    return Game._canvasWidth;
  }

  canvasHeight(): number {
    return Game._canvasHeight;
  }

  handleCommand(command: CommandInterface) {
    if (command instanceof TickCommand) {
      (new TickHandler()).handle(command);
    }
    if (command instanceof KeyDownCommand) {
      (new KeyDownHandler()).handle(command);
    }
    if (command instanceof KeyRightCommand) {
      (new KeyRightHandler()).handle(command);
    }
    if (command instanceof KeyUpCommand) {
      (new KeyUpHandler()).handle(command);
    }
    if (command instanceof KeyLeftCommand) {
      (new KeyLeftHandler()).handle(command);
    }
    if (command instanceof BackspaceCommand) {
      (new BackspaceHandler()).handle(command);
    }
    if (command instanceof EnterCommand) {
      (new EnterHandler()).handle(command);
    }
    if (command instanceof KeyNumericCommand) {
      (new KeyNumericHandler()).handle(command);
    }
    new TypeError('Command not supported.');
  }

}