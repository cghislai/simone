import {Observable} from 'rxjs';
import {Http, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, NgZone} from '@angular/core';
import {ServiceJson} from './domain/service';
import {TaskJson} from './domain/task';
import {FilterJson} from './domain/filter';
import {ContainerJson} from './domain/container';
import {Subscription} from 'rxjs/Subscription';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {ErrorService} from '../services/error.service';
import {DemuxedStream} from './domain/demuxedStream';
import {HttpClient} from './http.client';
import {ContainerAttachOptions} from './domain/container-attach-options';
import {ContainerStatsOptions} from './domain/container-stats-options';
import {ContainerRemoveOptions} from './domain/container-remove-options';
import {Volume} from './domain/volume';
import {Secret} from './domain/secret';
import {Network} from './domain/network';
import {Node} from './domain/node';
import {NodeSpec} from './domain/node-spec';
import {Version} from './domain/version';
import {ServiceSpec} from './domain/service-spec';
import {ContainerInspectInfo} from './domain/container-inspect-info';

import {Info} from './domain/info';
import {DockerClientConfigService} from '../services/docker-client.service';
import {DockerClientConfig} from '../domain/docker-client-config';
import {LogFilter} from './domain/log-filter';


@Injectable()
export class DockerClient {

  private requestIdSeq: number = 0;
  private runningRequests: number[] = [];
  private requestsCancellations: { [key: number]: Subscription } = {};
  private runningRequestCountChanged = new BehaviorSubject<number>(0);
  private requestsSuccesses = new Subject<boolean | Error>();

  constructor(private configService: DockerClientConfigService,
              private errorService: ErrorService,
              private httpClient: HttpClient,
              private zone: NgZone, private http: Http) {
  }

  listContainers(filter?: FilterJson): Observable<ContainerJson[]> {
    return this.request('containers/json', {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json());
  }


  inspectContainer(id: string): Observable<ContainerInspectInfo> {
    return this.request(`containers/${id}/json`, {
      method: 'GET',
    }).map(response => response.json());
  }

  getContainerLogsStream(id: string, options: ContainerAttachOptions): Observable<DemuxedStream> {
    let searchParams = this.mapSearchParams(options);
    return this.requestWsStream(`containers/${id}/attach/ws`, searchParams);
  }

  getContainerStats(id: string, options: ContainerStatsOptions): Observable<Response> {
    let stream = options.stream;
    let searchParams = new URLSearchParams();
    searchParams.append('stream', '0');
    if (!stream) {
      return this.request(`containers/${id}/stats`, {
        method: 'GET',
        search: searchParams,
      });
    } else {
      // Separate the requests, because using the stream returned by the docker daemon will send progress event
      // and the browser will keep appending to the xhr response, eventually hitting a memory limit.
      return Observable.timer(0, 3000)
        .mergeMap(t => {
          return this.request(`containers/${id}/stats`, {
            method: 'GET',
            search: searchParams,
          });
        });
    }
  }

  pauseContainer(id: string): Observable<Response> {
    return this.request(`containers/${id}/pause`, {
      method: 'POST',
    });
  }

  resumeContainer(id: string): Observable<Response> {
    return this.request(`containers/${id}/unpause`, {
      method: 'POST',
    });
  }

  restartContainer(id: string): Observable<Response> {
    return this.request(`containers/${id}/restart`, {
      method: 'POST',
    });
  }

  stopContainer(id: string): Observable<Response> {
    return this.request(`containers/${id}/stop`, {
      method: 'POST',
    });
  }

  startContainer(id: string): Observable<Response> {
    return this.request(`containers/${id}/start`, {
      method: 'POST',
    });
  }

  removeContainer(id: string, options: ContainerRemoveOptions): Observable<Response> {
    let search = this.createSearchParams(options);
    return this.request(`containers/${id}`, {
      method: 'DELETE',
      search: search,
    });
  }

  listTasks(filter?: FilterJson): Observable<TaskJson[]> {
    return this.request('tasks', {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json());
  }

  inspectTask(id: string): Observable<TaskJson> {
    return this.request(`tasks/${id}`, {
      method: 'GET',
    }).map(response => response.json());
  }


  listServices(filter?: FilterJson): Observable<ServiceJson[]> {
    return this.request('services', {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json());
  }

  inspectService(id: string): Observable<ServiceJson> {
    let params = new URLSearchParams();
    params.append('insertDefaults', 'true');
    return this.request(`services/${id}`, {
      method: 'GET',
      search: params,
    }).map(response => response.json());
  }

  updateService(id: string, version: Version, spec: ServiceSpec): Observable<any> {
    let queryParams: URLSearchParams = new URLSearchParams();
    queryParams.append('version', `${version.Index}`);
    return this.request(`services/${id}/update`, {
      method: 'POST',
      search: queryParams,
      body: spec,
    });
  }

  rollbackService(id: string, version: Version, spec: ServiceSpec): Observable<any> {
    let queryParams: URLSearchParams = new URLSearchParams();
    queryParams.append('version', `${version.Index}`);
    queryParams.append('rollback', 'previous');
    return this.request(`services/${id}/update`, {
      method: 'POST',
      search: queryParams,
      body: spec,
    });
  }

  getServiceLogs(id: string, filter: LogFilter): Observable<DemuxedStream> {
    let queryParams: URLSearchParams = new URLSearchParams();
    return this.requestWsStream(`services/${id}/logs/ws`, queryParams);
  }

  listVolumes(filter?: FilterJson): Observable<Volume[]> {
    return this.request('volumes', {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json())
      .map(json => json.Volumes);
  }

  inspectVolume(name: string): Observable<Volume> {
    return this.request(`volumes/${name}`, {
      method: 'GET',
    }).map(response => response.json());
  }

  listSecrets(filter?: FilterJson): Observable<Secret[]> {
    return this.request(`secrets`, {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json());
  }

  inspectSecret(name: string): Observable<Secret> {
    return this.request(`secrets/${name}`, {
      method: 'GET',
    }).map(response => response.json());
  }

  listNetworks(filter: FilterJson): Observable<Network[]> {
    return this.request(`networks`, {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json());
  }

  inspectNetwork(id: string): Observable<Network> {
    return this.request(`networks/${id}`, {
      method: 'GET',
    }).map(response => response.json());
  }

  listNodes(filter: FilterJson): Observable<Node[]> {
    return this.request(`nodes`, {
      method: 'GET',
      search: this.createSearchParams(filter),
    }).map(response => response.json());
  }

  inspectNode(id: string): Observable<Node> {
    return this.request(`nodes/${id}`, {
      method: 'GET',
    }).map(response => response.json());
  }

  updateNode(id: string, version: Version, spec: NodeSpec): Observable<any> {
    let queryParams: URLSearchParams = new URLSearchParams();
    queryParams.append('version', `${version.Index}`);
    return this.request(`nodes/${id}/update`, {
      method: 'POST',
      search: queryParams,
      body: spec,
    });
  }

  info(config?: DockerClientConfig): Observable<Info> {
    if (config == null) {
      return this.request(`info`, {
        method: 'GET',
      }).map(response => response.json());
    }
    let url = `${config.api.endPointUrl}/${config.api.version}/info`;
    let request = this.http.request(url, {
      method: 'GET',
    });
    return this.wrapRequest(request)
      .map(response => response.json());
  }

  ping(): Observable<Response> {
    return this.request(`_ping`, {
      method: 'GET',
    });
  }

  getRunningRequestCountObservable(): Observable<number> {
    return this.runningRequestCountChanged.asObservable();
  }

  getRequestSucessObservable(): Observable<boolean> {
    return this.requestsSuccesses.asObservable()
      .map(o => o === true);
  }


  stopAllRequests() {
    for (var id in this.requestsCancellations) {
      this.requestsCancellations[id].unsubscribe();
      delete this.requestsCancellations[id];
    }
  }

  mapFilterLabels(labels: string[]): string[] {
    return labels;
    // .map(label => label.replace('=', ':'));
  }

  mapSearchParams(options: any): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams();
    let keys = Reflect.ownKeys(options);
    for (var key of keys) {
      if (typeof key === 'string') {
        params.append(key, options[key]);
      }
    }
    return params;
  }

  private getNextRequestId(): number {
    let id = this.requestIdSeq;
    this.requestIdSeq = this.requestIdSeq + 1;
    return id;
  }

  private request(path: string, options: RequestOptionsArgs): Observable<Response> {
    let clientConfig = this.configService.getActiveConfigNow();
    if (clientConfig == null) {
      console.warn('no config');
      return Observable.empty();
    }
    let url = `${clientConfig.api.endPointUrl}/${clientConfig.api.version}/${path}`;
    let request = this.http.request(url, options);
    return this.wrapRequest(request);
  }

  private requestWsStream(path: string, searchParams: URLSearchParams): Observable<DemuxedStream> {
    let clientConfig = this.configService.getActiveConfigNow();
    if (clientConfig == null) {
      console.warn('no config');
      return Observable.empty();
    }
    let url = `${clientConfig.api.endPointUrl}/${clientConfig.api.version}/${path}?${searchParams.toString()}`;
    let request = this.httpClient.requestWebSocketStream(url);
    return this.wrapRequest(request);
  }

  private wrapRequest<T>(request: Observable<T>): Observable<T> {
    let cachedRequest = request.publishReplay(1);
    let requestId = this.getNextRequestId();

    cachedRequest.subscribe(
      response => this.onRequestSuccess(requestId),
      error => this.onRequestError(requestId, error),
    );
    let mainRequestSubscription = cachedRequest.connect();
    let unsubscribedSubscription = new Subscription(() => {
      this.onRequestCompleted(requestId);
    });
    mainRequestSubscription.add(unsubscribedSubscription);

    this.onRequestStarted(requestId, mainRequestSubscription);
    return cachedRequest;
  }

  private onRequestStarted(id: number, mainSubscription: Subscription) {
    this.runningRequests.push(id);
    this.requestsCancellations[id] = mainSubscription;
    this.runningRequestCountChanged.next(this.runningRequests.length);
  }

  private onRequestSuccess(id: number) {
    this.requestsSuccesses.next(true);
  }

  private onRequestError(id: number, error: any) {
    this.requestsSuccesses.next(error);
    if (error instanceof Response) {
      let title = `Request errored`;
      let statusMessage = error.statusText;
      let relUrl = this.getResponseRelativeUrl(error);
      let message = `${relUrl} : ${statusMessage}`;
      this.errorService.addErrorWithTitle(title, message);
    } else if (error.message != null) {
      this.errorService.addError(error.message);
    } else {
      let title = `Request errored`;
      this.errorService.addErrorWithTitle(title, error);
    }
  }

  private onRequestCompleted(id: number) {
    let subscription = this.requestsCancellations[id];
    delete this.requestsCancellations[id];
    this.runningRequests = this.runningRequests
      .filter(rid => rid !== id);
    this.runningRequestCountChanged.next(this.runningRequests.length);
    subscription.unsubscribe();
  }

  private createSearchParams(filter: any): URLSearchParams {
    let searchParams: URLSearchParams = new URLSearchParams();
    let keys: any[] = Reflect.ownKeys(filter);
    keys.filter(key => typeof key === 'string')
      .forEach(key => {
        let value = filter[key];
        if (value == null) {
          return;
        }
        let jsonValue = JSON.stringify(value);
        searchParams.append(key, jsonValue);
      });
    return searchParams;
  }


  private getResponseRelativeUrl(error: any): string {
    let config = this.configService.getActiveConfigNow();
    let wsUrl = config.api.endPointUrl;
    let version = config.api.version;
    if (error.url != null) {
      let relUrl = error.url.replace(wsUrl, '')
        .replace(`/${version}`, '')
        .split('?')[0];
      return relUrl;
    } else {
      return wsUrl;
    }
  }

}
