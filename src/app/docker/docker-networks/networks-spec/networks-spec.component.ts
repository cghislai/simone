import {Component, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NetworkSpec} from '../../client/domain/network-spec';
import {DockerNetworksService} from '../../services/docker-netwoks.service';
import {Network} from '../../client/domain/network';

@Component({
  selector: 'app-networks-spec',
  templateUrl: './networks-spec.component.html',
  styleUrls: ['./networks-spec.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NetworksSpecComponent,
    multi: true,
  }],
})
export class NetworksSpecComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;

  networkSpecs: NetworkSpec[];
  networks: Network[] = [];

  newSpecNetwork: Network;
  newSpecAliases: string[];
  newSpecSuggestions: Network[];

  private onTouchedFunction: Function;
  private onChangeFunction: Function;

  constructor(private networksService: DockerNetworksService) {
  }

  ngOnInit() {
    this.networksService.list()
      .subscribe(networks => this.networks = networks);
  }


  writeValue(obj: any): void {
    this.networkSpecs = obj;
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  getNetworkname(id: string): string {
    if (this.networks == null) {
      return id;
    }
    let net = this.networks
      .find(net => net.Id === id);
    if (net != null) {
      return net.Name;
    }
    return null;
  }

  completeNewSpecNetwork(event?:any) {
    if (event == null) {
      this.newSpecSuggestions = [...this.networks];
      return;
    }
    let text = event.query;
    this.newSpecSuggestions = [...this.networks
      .filter(net => {
        let lowerName = net.Name.toLocaleLowerCase();
        let lowerText = text.toLocaleLowerCase();
        return lowerName.indexOf(lowerText) >= 0;
      })];
  }

  onAddNewSpecClicked() {
    let spec: NetworkSpec = {
      Target: this.newSpecNetwork.Id,
      Aliases: this.newSpecAliases,
    };
    let newSpecs = [...this.networkSpecs, spec];

    this.networkSpecs = newSpecs;
    this.onTouchedFunction();
    this.onChangeFunction(newSpecs);

    this.newSpecNetwork = null;
    this.newSpecAliases = [];
  }

  onRemoveSpecClicked(spec, index: number) {
    let newSpecs = [...this.networkSpecs];
    newSpecs.splice(index, 1);

    this.networkSpecs = newSpecs;
    this.onTouchedFunction();
    this.onChangeFunction(newSpecs);
  }
}
