import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-unique-id',
  templateUrl: './unique-id.component.html',
  styleUrls: ['./unique-id.component.scss'],
})
export class UniqueIdComponent implements OnInit {

  @Input()
  id: string;
  @Input()
  routerLink: any[];
  @Input()
  noTrim: boolean;
  @Input()
  trimWidthEm: number = 6;

  constructor() {
  }

  ngOnInit() {
  }

  getMaxWidthCss(): string {
    return this.noTrim ? null : `${this.trimWidthEm}em`;
  }

}
