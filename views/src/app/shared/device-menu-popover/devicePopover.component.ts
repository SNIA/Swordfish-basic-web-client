

import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import {Popover, PopoverContent, PopoverModule} from "ngx-popover";

@Component({
  selector: 'device-popover',
  templateUrl: 'devicePopover.html',
  styleUrls: [ 'devicePopover.css']
})
export class DeviceComponentComponent  {
  @ViewChild("myPopover")  popover: Popover;

  ngAfterViewInit() {
  /*  this.popover.show();*/
  }
  private show:any;
  constructor() {
    alert("hai");
   /* this.popover.show();*/
  }
}
