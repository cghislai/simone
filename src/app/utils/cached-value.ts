import {Observable} from 'rxjs/Observable';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class CachedValue<T> {

  private cacheValiditySeconds: number;
  private valueFetcher: () => Observable<T>;

  private currentValue = new BehaviorSubject<T>(null);
  private valueFetchTime: moment.Moment;

  // private fetchingTask: Observable<T>;

  constructor(valueFetcher: () => Observable<T>, cacheValiditySeconds: number) {
    this.valueFetcher = valueFetcher;
    this.cacheValiditySeconds = cacheValiditySeconds;
  }

  getValue(): Observable<T> {
    return this.currentValue.asObservable()
      .do(o => {
        if (!this.isValueValid()) {
          this.fetchValue();
        }
      })
      .filter(v => v != null)
      .share();
  }

  invalidate() {
    this.valueFetchTime = null;
    this.fetchValue();
  }

  private isValueValid() {
    if (this.currentValue.getValue() == null || this.valueFetchTime == null) {
      return false;
    }
    let now = moment();
    let expiration = this.valueFetchTime.clone()
      .add(this.cacheValiditySeconds, 'second');
    return expiration.isAfter(now);
  }

  private fetchValue() {
    this.valueFetcher()
      .catch(e => Observable.empty<T>())
      .subscribe(val => {
        this.valueFetchTime = moment();
        this.currentValue.next(val);
      });
  }
}
