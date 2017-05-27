import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, Component, ElementRef, Input, OnChanges, OnInit,
  ViewChild,
} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-expand-box',
  templateUrl: './expand-box.component.html',
  styleUrls: ['./expand-box.component.scss'],
})
export class ExpandBoxComponent implements OnInit, AfterContentChecked, AfterContentInit {

  @Input()
  expanded: boolean;
  @Input()
  maxHeight: string = '60';
  @ViewChild('content')
  contentElement: ElementRef;

  expandRequired : boolean

  constructor() {
  }

  ngOnInit() {
    this.expandRequired = this.isExpandRequired();
  }

  ngAfterContentInit() {
    this.expandRequired = this.isExpandRequired();
  }
  ngAfterContentChecked() {
    this.expandRequired = this.isExpandRequired();
  }

  isExpandRequired() {
    if (this.contentElement == null || this.contentElement.nativeElement == null || this.contentElement.nativeElement.clientHeight == null) {
      return true;
    }
    let elementHeight = this.contentElement.nativeElement.clientHeight;
    return elementHeight >= this.maxHeight;
  }

  expand() {
    this.expanded = true;
  }
}
