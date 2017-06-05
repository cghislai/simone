import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NodeFilter} from '../../client/domain/node-filter';
import {NODE_COLUMN_DATA, NodeColumn} from './node-column';
import {Node} from '../../client/domain/node';
import {Observable} from 'rxjs/Observable';
import {DockerNodesService} from '../../services/docker-nodes.service';
import {DockerService} from '../../services/docker.service';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.component.html',
  styleUrls: ['./node-list.component.scss'],
})
export class NodeListComponent implements OnInit, OnChanges {

  @Input()
  filter: NodeFilter;
  @Input()
  columns: NodeColumn[];

  @Output()
  nodesChange = new EventEmitter<Node[]>();

  nodes: Observable<Node[]>;

  constructor(private dockerService: DockerService,
              private nodesService: DockerNodesService) {
  }

  ngOnInit() {
    let heartbeatTasks = this.dockerService.getHeartBeatObservable()
      .mergeMap(r => this.fetchNodes());
    this.nodes = this.fetchNodes()
      .concat(heartbeatTasks)
      .do(networks => this.nodesChange.next(networks))
      .share();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] != null) {
      this.dockerService.beat();
    }
  }

  getColumnLabel(column: NodeColumn): string {
    return NODE_COLUMN_DATA[column].label['en'];
  }

  getColumnField(column: NodeColumn): string {
    return NODE_COLUMN_DATA[column].field
  }

  private fetchNodes() {
    return this.nodesService.list(this.filter)
      .catch(e => Observable.of([]));
  }

}
