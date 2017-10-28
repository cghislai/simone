import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';
import {ContainerInspectInfo} from '../../client/domain/container-inspect-info';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: ['./container-details.component.scss'],
})
export class ContainerDetailsComponent implements OnInit, OnDestroy {

  @Input()
  container: ContainerInspectInfo;
  @Output()
  containerChanged = new EventEmitter<boolean>();

  activeTab: number = 0;

  private subscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    let tabSubcription = this.activatedRoute.params
      .map(params => params['activeTab'] == null ? 0 : params['activeTab'])
      .subscribe(tab => this.loadTab(tab));

    this.subscription = new Subscription();
    this.subscription.add(tabSubcription);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onTabChange(event: any) {
    this.router.navigate([{activeTab: event.index}], {
      preserveFragment: true,
      relativeTo: this.activatedRoute,
      replaceUrl: true,
    });
  }

  onContainerChange() {
    this.containerChanged.next(true);
  }

  private loadTab(tabIndex: number) {
    this.activeTab = tabIndex;
  }
}
