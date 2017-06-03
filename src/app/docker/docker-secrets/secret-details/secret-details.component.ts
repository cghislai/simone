import {Component, Input, OnInit} from '@angular/core';
import {Secret} from '../../client/domain/secret';

@Component({
  selector: 'app-secret-details',
  templateUrl: './secret-details.component.html',
  styleUrls: ['./secret-details.component.scss'],
})
export class SecretDetailsComponent implements OnInit {


  @Input()
  secret: Secret;

  constructor() {
  }

  ngOnInit() {
  }

}
