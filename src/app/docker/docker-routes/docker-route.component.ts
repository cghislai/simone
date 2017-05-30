import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {Message} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from '../services/error.service';

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
      .map(messages => this.createMessages(messages))
      .share();
  }

  dismissErrors() {
    this.errorService.dismissErrors();
  }

  private createMessages(messages: string[]): Message[] {
    return messages.map(message => <Message>{
      severity: 'error',
      detail: message,
    });
  }
}
