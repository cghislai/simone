import {Observable} from 'rxjs/Observable';

export interface BackgroundTask {
  id?: number;
  label: string;
  status: Observable<string>;
  content: Observable<any>;
  cancellable: boolean;
  error?: any;
}
