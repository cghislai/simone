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

  constructor() {
  }

  ngOnInit() {
  }


}
