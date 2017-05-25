import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {DockerOptionsService} from '../services/docker-options.service';
import {Message} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {SimoneDockerOptions} from '../domain/docker-options';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-docker-options-page',
  templateUrl: './docker-options-page.component.html',
  styleUrls: ['./docker-options-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerOptionsPageComponent implements OnInit {

  messages: Message[] = [];
  clientStated: Observable<boolean>;
  dockerOptions: Observable<SimoneDockerOptions>;
  subscription: Subscription;

  constructor(private dockerService: DockerService,
              private optionsService: DockerOptionsService) {
  }

  ngOnInit() {
    this.clientStated = this.dockerService.getStartedObservable();
    this.dockerOptions = this.optionsService.getOptions()
      .map(options => Object.assign({}, options));
    this.subscription = new Subscription();
  }

  onOptionsChange(options: SimoneDockerOptions) {
    this.optionsService.setOptions(options);
    this.messages.push({
      severity: 'success',
      summary: 'Saved',
      detail: 'Options have been saved',
    });
  }

  onOptionsCancelled() {
    let options = this.optionsService.getLastOptions();
    this.optionsService.setOptions(options);
    this.messages.push({
      severity: 'info',
      summary: 'Restored',
      detail: 'Options have been restored',
    });
  }

  onStartClicked() {
    this.startClient();
  }

  onStopClicked() {
    this.stopClient();
  }


  private startClient() {
    this.dockerService.startClient();
    this.messages.push({
      severity: 'info',
      summary: 'Started',
      detail: 'Client has started',
    });
  }

  private stopClient() {
    this.dockerService.stopClient();
    this.messages.push({
      severity: 'info',
      summary: 'Stopped',
      detail: 'Client has stopped',
    });
  }
}
