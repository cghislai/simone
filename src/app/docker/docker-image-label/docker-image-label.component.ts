import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-docker-image-label',
  templateUrl: './docker-image-label.component.html',
  styleUrls: ['./docker-image-label.component.scss'],
})
export class DockerImageLabelComponent implements OnInit, OnChanges {

  @Input()
  label: string;

  hostPart: string;
  labelPart: string;
  tagPart: string;
  checksumPart: string;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['label']) {
      this.initLabelParts(changes['label'].currentValue);
    }
  }

  private initLabelParts(label: string) {
    this.hostPart = null;
    this.labelPart = null;
    this.tagPart = null;
    this.checksumPart = null;
    if (label == null) {
      return;
    }

    var curLabel = label;
    let checksumParts = curLabel.split('@');
    if (checksumParts.length > 1) {
      this.checksumPart = checksumParts[1];
    }
    curLabel = checksumParts[0];

    let firstSlash = curLabel.indexOf('/');
    let beforeFirstSlash = curLabel.substr(0, firstSlash);
    if (beforeFirstSlash.indexOf(':') >= 0) {
      this.hostPart = beforeFirstSlash;
      curLabel = curLabel.substr(firstSlash + 1, curLabel.length - firstSlash);
    }

    let tagParts = curLabel.split(':');
    if (tagParts.length > 1) {
      this.tagPart = tagParts[1];
    }
    this.labelPart = tagParts[0];
  }
}
