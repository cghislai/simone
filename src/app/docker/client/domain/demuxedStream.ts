import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export interface DemuxedStream {
  in: Subject<string>,
  out: Observable<string>,
  err: Observable<string>
}
