import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node} from '../../client/domain/node';
import {NodeSpec} from '../../client/domain/node-spec';
import {DockerNodesService} from '../../services/docker-nodes.service';

@Component({
  selector: 'app-node-details',
  templateUrl: './node-details.component.html',
  styleUrls: ['./node-details.component.scss'],
})
export class NodeDetailsComponent implements OnInit {


  @Input()
  node: Node;
  @Output()
  nodeChanged = new EventEmitter<any>();


  constructor(private nodeService: DockerNodesService) {
  }

  ngOnInit() {
  }

  onSpecChange(spec: NodeSpec) {
    this.nodeService.update(this.node.ID, this.node.Version, spec)
      .subscribe(r => this.nodeChanged.next(true));
  }


}
