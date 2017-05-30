import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class ErrorService {

  private messagesSource: BehaviorSubject<string[]>;

  errors: Observable<string[]>;

  constructor() {
    this.messagesSource = new BehaviorSubject<string[]>([]);
    this.errors = this.messagesSource.asObservable().share();
  }

  addError(message: string) {
    let curList = this.messagesSource.getValue();
    this.messagesSource.next([...curList, message]);
  }

  addErrorWithTitle(title: string, message: string) {
    let curList = this.messagesSource.getValue();
    this.messagesSource.next([...curList, message]);
  }

  dismissErrors() {
    this.messagesSource.next([]);
  }

  getErrorMessages(): Observable<string[]> {
    return this.errors;
  }
}
