import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DockerService} from '../services/docker.service';
import {DockerOptionsService} from '../services/docker-options.service';
import {Message, SelectItem} from 'primeng/primeng';
import {Observable} from 'rxjs/Observable';
import {SimoneDockerOptions} from '../domain/docker-options';
import {Subscription} from 'rxjs/Subscription';
import {ObjectUtils} from '../../utils/ObjectUtils';

@Component({
  selector: 'app-docker-options-page',
  templateUrl: './docker-options-page.component.html',
  styleUrls: ['./docker-options-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DockerOptionsPageComponent implements OnInit {

  messages: Message[] = [];
  dockerOptions: Observable<SimoneDockerOptions>;
  subscription: Subscription;
  dockerOptionsChoices: Observable<SelectItem[]>;

  constructor(private optionsService: DockerOptionsService) {
  }

  ngOnInit() {
    this.dockerOptionsChoices = this.optionsService.getOptions()
      .filter(o => o != null)
      .map(options => options.map(o => <SelectItem>{
        label: o.label,
        value: o.label,
      }));
    this.dockerOptions = this.optionsService.getCurrentOptionsObservable()
      .map(options => ObjectUtils.jsonClone(options));
    this.subscription = new Subscription();

  }

  activeOptionsChanged(label: string) {
    this.optionsService.getOptions()
      .map(o => o.find(op => op.label === label))
      .filter(o => o != null)
      .take(1)
      .subscribe(o => this.optionsService.setCurrentOptions(o));
  }

  onNewOptionsClicked() {
    let options = this.optionsService.createDefaultOptions();
    this.optionsService.setCurrentOptions(options);
  }

  onRemoveOptionsClicked() {
    let curOptions = this.optionsService.getCurrentOptions();
    this.optionsService.removeOptions(curOptions.label);
  }

  onOptionsChange(options: SimoneDockerOptions) {
    this.optionsService.setCurrentOptions(options);
    this.messages.push({
      severity: 'success',
      summary: 'Saved',
      detail: 'Options have been saved',
    });
  }

  onOptionsCancelled() {
    let options = this.optionsService.getCurrentOptions();
    this.optionsService.setCurrentOptions(options);
    this.messages.push({
      severity: 'info',
      summary: 'Restored',
      detail: 'Options have been restored',
    });
  }
}
