import {Observable} from 'rxjs/Observable';
import {DemuxedStream} from './domain/demuxedStream';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpClient {

  constructor() {
  }

  requestWebSocketStream(url: string): Observable<DemuxedStream> {
    let wsUrl = url.replace('https', 'wss')
      .replace('http', 'ws');

    return new Observable<DemuxedStream>(subscriber => {
      let ws = new WebSocket(wsUrl);
      let hasStream = false;

      let messageOutSource = new Subject<string>();
      let messageInObservable = this.createWsMessageInObservable(ws, messageOutSource);

      ws.addEventListener('open', e => {
        let demuxedStream = this.demuxWsStream(messageInObservable, messageOutSource);
        hasStream = true;
        subscriber.next(demuxedStream);
        subscriber.complete();
      });
      ws.addEventListener('close', e => {
        subscriber.complete();
      });

      let tearDownLogic = () => {
        // ws will be closed when unsubscribing from message stream
        if (!hasStream) {
          ws.close(1000);
        }
      };

      return tearDownLogic;
    });

  }

  private demuxWsStream(messageIn: Observable<string>, messageOut: Subject<string>) {
    // No way to differentiate stderr/out currently
    let sharedMessageIn = messageIn.share();
    let stream: DemuxedStream = {
      in: messageOut, // StdIn are the message to send out
      out: sharedMessageIn,
      err: sharedMessageIn,
    };
    return stream;
  }

  private createWsMessageInObservable(ws: WebSocket, messageOutSource: Subject<string>): Observable<string> {
    return new Observable(subscriber => {
      ws.addEventListener('message', e => {
        let blob: Blob = e.data;
        var reader = new FileReader();
        reader.addEventListener('loadend', e => {
          let data: string = reader.result;
          subscriber.next(data);
        });
        reader.readAsText(blob, 'UTF-8');
      });
      ws.addEventListener('error', e => {
        subscriber.error(e);
      });
      ws.addEventListener('close', e => {
        subscriber.complete();
      });
      let messageOutSubscription = messageOutSource.subscribe(message => ws.send(message));

      return () => {
        messageOutSubscription.unsubscribe();
        if (ws.readyState === WebSocket.CONNECTING
          || ws.readyState === WebSocket.OPEN) {
          // FIXME: connection closed after 1min or so in Chrome
          ws.close(1000);
        }
      }
    });
  }
}
