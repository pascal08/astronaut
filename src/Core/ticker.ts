export class Ticker {
  private t: number = 0;
  private isTicking: boolean = false;
  private tPrevious: number|null = null;

  constructor() {
    this.t = 0;
  }

  tick() {
    if (!this.tPrevious) {
      this.tPrevious = Date.now();
    }

    while (this.isTicking) {
      const tNow = Date.now();
      this.t = this.t + (this.tPrevious - tNow);
      this.tPrevious = tNow;
    }
  }

  start() {
    this.isTicking = true;
  }

  stop() {
    this.isTicking = false;
  }
}