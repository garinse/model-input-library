/**
 * Use to emit custom events of component
 */
export class EventEmitter<T> {
  private _observers: Observer<T>[] = [];

  /**
   * Registers handlers for events emitted by this instance.
   * @param observer or callback function
   */
  subscribe(observer: Observer<T> | ((value?: any) => void)) {
    typeof observer === 'function' && (observer = { next: observer });
    this._observers.push(observer);
    
    return {
      /**
       * Disposes the resources held by the subscription
       */
      unsubscribe: () => {
        this._observers = this._observers.filter(o => o !== observer);
      }
    };
  }

  /**
   * Releases All Subscriptions
   */
  unsubscribe() {
    this._observers = [];
  }

  /**
   * Notifies all subscribers
   * @param value
   */
  emit(value?: T) {
    for (const observer of this._observers) {
        observer.next(value);
    }
  }
}


export interface Observer<T> {
  next: (value?: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}
