import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DockerClientConfigService} from '../docker-client.service';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class SwarmControlRouteGuard implements CanActivate {
  constructor(private configService: DockerClientConfigService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.configService.getActiveConfigNullable()
      .take(1)
      .map(c => c != null && c.serverInfo != null && c.serverInfo.swarmControl)
      .do(control => {
        if (!control) {
          this.router.navigate(['/docker/containers']);
        }
      });
  }

}
