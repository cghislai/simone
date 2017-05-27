import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ContainerInspectInfo} from 'dockerode';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-container-details',
  templateUrl: './container-details.component.html',
  styleUrls: ['./container-details.component.scss'],
})
export class ContainerDetailsComponent implements OnInit, OnDestroy {

  @Input()
  container: ContainerInspectInfo;
  activeTab: number;

  private subscription: Subscription;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,) {
  }

  ngOnInit() {
    let tabSubcription = this.activatedRoute.params
      .map(params => params['activeTab'])
      .subscribe(tab => this.activeTab = tab);
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
}
