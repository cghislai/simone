import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {ErrorMessage} from '../domain/error-message';

/**
 * Created by cghislai on 11/02/17.
 */

@Injectable()
export class ErrorService {

  private messagesSource: BehaviorSubject<ErrorMessage[]>;
  private errors: Observable<ErrorMessage[]>;


  constructor() {
    this.messagesSource = new BehaviorSubject<ErrorMessage[]>([]);
    this.errors = this.messagesSource.asObservable().share();
  }

  addError(message: string) {
    let curList = this.messagesSource.getValue();
    let errorMessage: ErrorMessage = {
      message: message.toString(),
    };
    this.messagesSource.next([...curList, errorMessage]);
  }

  addErrorWithTitle(title: string, message: string) {
    let curList = this.messagesSource.getValue();
    let errorMessage: ErrorMessage = {
      title: title,
      message: message.toString(),
    };
    this.messagesSource.next([...curList, errorMessage]);
  }

  dismissErrors() {
    this.messagesSource.next([]);
  }

  getErrorMessages(): Observable<ErrorMessage[]> {
    return this.errors;
  }
}
