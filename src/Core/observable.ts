import { ObserverInterface } from './observer.interface';
import { ObservableInterface } from './observable.interface';

export class Observable implements ObservableInterface {
  private observers: Array<ObserverInterface> = [];

  publish(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  subscribe(observer: ObserverInterface): void {
    const exists = this.observers.includes(observer);
    if (exists) {
      return;
    }

    this.observers.push(observer);
  }

  unsubscribe(observer: ObserverInterface): void {
    const index = this.observers.indexOf(observer);
    if (index === -1) {
      return;
    }

    this.observers.splice(index, 1);
  }
}