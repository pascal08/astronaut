import { ObserverInterface } from './observer.interface';

export interface ObservableInterface {
  subscribe(observer: ObserverInterface): void;

  unsubscribe(observer: ObserverInterface): void;

  publish(): void;
}