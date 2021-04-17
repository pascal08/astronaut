import { CommandInterface } from '../command.interface';

export class KeyNumericCommand implements CommandInterface {

  private readonly _digit: string;

  constructor(
    digit: string
  ) {
    if (digit === '' || isNaN(Number(digit))) {
      throw new Error('Not a digit.');
    }
    this._digit = digit;
  }

  get digit(): string {
    return this._digit;
  }
}