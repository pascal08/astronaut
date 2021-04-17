import { ObservableInterface } from './observable.interface';

export interface ObserverInterface {
  update(observable: ObservableInterface): void;
}