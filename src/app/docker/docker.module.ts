import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DockerOptionsFormComponent} from './docker-options-form/docker-options-form.component';
import {DockerOptionsPageComponent} from './docker-options-page/docker-options-page.component';
import {DockerService} from './services/docker.service';
import {ButtonModule} from 'primeng/components/button/button';
import {FormsModule} from '@angular/forms';
import {DockerClient} from '../client/docker.client';
import {DockerOptionsService} from './services/docker-options.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ButtonModule,
  ],
  declarations: [
    DockerOptionsFormComponent,
    DockerOptionsPageComponent,
  ],
  exports: [
    DockerOptionsPageComponent,
  ],
  providers: [
    DockerClient,
    DockerOptionsService,
    DockerService,
  ],
})
export class DockerModule {
}
