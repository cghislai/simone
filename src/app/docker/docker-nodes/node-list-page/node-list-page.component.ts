import {Component, OnDestroy, OnInit} from '@angular/core';
import {NodeFilter} from '../../client/domain/node-filter';
import {NODE_COLUMN_DATA, NODE_COLUMNS, NodeColumn} from '../node-list/node-column';
import {SelectItem} from 'primeng/primeng';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DockerService} from '../../services/docker.service';
import {Node} from '../../client/domain/node';

@Component({
  selector: 'app-node-list-page',
  templateUrl: './node-list-page.component.html',
  styleUrls: ['./node-list-page.component.scss'],
})
export class NodeListPageComponent implements OnInit, OnDestroy {


  filter: NodeFilter;
  columns: NodeColumn[];
  columnOptions: SelectItem[];
  nodesCount: number = 0;

  private subscription: Subscription;


  constructor(private dockerService: DockerService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params
      .subscribe(params => this.onRouteParamsChange(params));
    this.dockerService.beat();
    this.initFilter();
    this.initDefaultColumns();
    this.columnOptions = NODE_COLUMNS
      .map(col => <SelectItem>{
        value: col,
        label: NODE_COLUMN_DATA[col].label['en'],
      });
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFilterChange(filter: NodeFilter) {
    if (this.activatedRoute != null) {
      let params = {};
      if (filter.role.length > 0) {
        params['role'] = this.reduceToRouteParam(filter.role);
      }
      if (filter.name.length > 0) {
        params['name'] = this.reduceToRouteParam(filter.name);
      }
      if (filter.id.length > 0) {
        params['id'] = this.reduceToRouteParam(filter.id);
      }
      if (filter.membership.length > 0) {
        params['membership'] = this.reduceToRouteParam(filter.membership);
      }
      if (filter.label.length > 0) {
        params['label'] = this.reduceToRouteParam(filter.label);
      }

      this.router.navigate(['../', params], {
        relativeTo: this.activatedRoute,
        replaceUrl: true,
      });
    }
  }

  onNodesChange(nodes: Node[]) {
    this.nodesCount = nodes.length;
  }

  private onRouteParamsChange(params: Params) {
    let filter = Object.assign({}, this.filter);
    filter.role = <('worker' | 'manager')[]>this.extractRouteParam(params['role']);
    filter.label = this.extractRouteParam(params['label']);
    filter.membership = <('accepted' | 'pending')[]>this.extractRouteParam(params['membership']);
    filter.id = this.extractRouteParam(params['id']);
    filter.name = this.extractRouteParam(params['name']);

    this.filter = filter;
  }


  private reduceToRouteParam(array: string[]): string {
    return array == null ? null : array.reduce((cur, next) => {
      return cur == null ? next : cur + ',' + next
    }, null);
  }

  private extractRouteParam(param: string): string[] {
    if (param == null) {
      return [];
    }
    return param.split(',');
  }

  private initDefaultColumns() {
    this.columns = [
      NodeColumn.ID,
      NodeColumn.HOSTNAME,
      NodeColumn.STATUS_ADDRESS,
      NodeColumn.ENGINE_VERSION,
      NodeColumn.ROLE,
      NodeColumn.AVAILABILITY,
      NodeColumn.STATUS_STATE,
      NodeColumn.CREATED_AT,
    ];
  }

  private initFilter() {
    this.filter = {
      label: [],
      membership: [],
      name: [],
      id: [],
      role: [],
    };
  }
}
