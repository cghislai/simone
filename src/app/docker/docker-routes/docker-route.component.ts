import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {Message} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../services/error.service';
import {ErrorMessage} from '../domain/error-message';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

@Component({
  selector: 'app-docker-route',
  templateUrl: './docker-route.component.html',
  styleUrls: ['./docker-route.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerRouteComponent implements OnInit {

  errorMessages: Observable<Message[]>;

  constructor(private dockerService: DockerService,
              private errorService: ErrorService) {
  }

  ngOnInit() {
    this.dockerService.startClient();
    this.errorMessages = this.errorService
      .getErrorMessages()
      .map(messages => this.countDuplicates(messages))
      .map(messages => this.createMessages(messages))
      .share();
  }

  dismissErrors() {
    this.errorService.dismissErrors();
  }

  private createMessages(messages: ErrorMessage[]): Message[] {
    return messages.map(message => <Message>{
      severity: 'error',
      detail: message.message,
      summary: message.title != null ? message.title : undefined,
    });
  }

  private countDuplicates(messages: ErrorMessage[]): ErrorMessage[] {
    let messagesWithCount: { message: ErrorMessage, count: number }[] =
      messages.reduce((cur, next) => {
        let existing = cur.find(m => this.isSameMessage(m.message, next));
        if (existing != null) {
          existing.count = existing.count + 1;
        } else {
          let withCount = {message: next, count: 1};
          cur.push(withCount);
        }
        return cur;
      }, []);
    return messagesWithCount.map(withCount => {
      if (withCount.count === 1) {
        return withCount.message;
      }
      let newMessage = `${withCount.message.message} (${withCount.count} x)`;
      return <ErrorMessage>{
        title: withCount.message.title,
        message: newMessage,
      };
    });
  }

  private isSameMessage(msg1: ErrorMessage, msg2: ErrorMessage) {
    return msg1.title === msg2.title && msg1.message === msg2.message;
  }
}
