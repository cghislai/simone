import {Component, Input, OnInit} from '@angular/core';
import {PortBinding} from '../client/domain/port-binding';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-port-mappings',
  templateUrl: './port-mappings.component.html',
  styleUrls: ['./port-mappings.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PortMappingsComponent,
    multi: true,
  }],
})
export class PortMappingsComponent implements OnInit, ControlValueAccessor {

  @Input()
  editable: boolean;

  ports: PortBinding[];
  portStrings: string[];
  private onTouchedFunction: Function;
  private onChangeFunction: Function;


  constructor() {
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.ports = obj;
    this.portStrings = this.mapPortsToString(obj);
  }

  registerOnChange(fn: any): void {
    this.onChangeFunction = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFunction = fn;
  }

  onPortsChanged(strings: string[]) {
    let ports = this.parsePortsStrings(strings);
    this.portStrings = strings;
    this.ports = ports;
    this.onTouchedFunction();
    this.onChangeFunction(this.ports);
  }

  private mapPortsToString(ports: PortBinding[]): string[] {
    if (ports == null) {
      return [];
    }
    let strings = ports.map(binding=>{
      return `${binding.PublishedPort}:${binding.TargetPort}/${binding.Protocol}`
    });
    return strings;
  }

  private parsePortsStrings(ports: string[]): PortBinding[] {
    if (ports == null) {
      return [];
    }
    let bindings = ports.map(portString=>{
      let slashSplit = portString.split('/');
      let protocol = slashSplit.length > 1 ? slashSplit[1]: 'tcp';
      let portSplit = slashSplit[0].split(':');
      return <PortBinding>{
        Protocol: protocol,
        PublishedPort: parseInt(portSplit[0]),
        TargetPort: parseInt(portSplit[1]),
        PublishMode: 'ingress'
      };
    });
    return bindings;
  }

}
