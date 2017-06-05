import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../../client/domain/node';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss'],
})
export class NodeDetailsComponent implements OnInit {


  @Input()
  node: Node;

  constructor() {
  }

  ngOnInit() {
  }

}
