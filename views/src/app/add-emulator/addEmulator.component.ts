/**
 * Created by Sravanthi on 4/26/2017.
 */
import {Component, OnInit, Input,  Output,EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HomeService} from "../home/shared/home.service";

@Component({
  selector:'addEmulator-modal',
  templateUrl:'addEmulator.html',
  styleUrls:[],
})
export class AddEmulatorComponent implements OnInit{
  public remove: any;
  private showWarning: any;

  @Input() DeviceInfo: any;
  @Output() IPInfo = new EventEmitter();
  @Output() toggleAddModal =  new EventEmitter();
  public addForm = this.formBuilder.group({
    sysName:['',Validators.required],
    domainName:['',Validators.required],
    userName:['',Validators.required],
    password:['',Validators.required]
  });
  constructor(public formBuilder: FormBuilder ,private homeService:HomeService) {
  }
  ngOnInit() {
  }
  public closeModal() {
    this.IPInfo.emit({'value': false});
  }
    onAddDevice() {
        this.IPInfo.emit({'IPAddress': this.addForm.value['sysName'],'DomainName':this.addForm.value['domainName']});
        let credentials = {
          "UserName":this.addForm.value['userName'],
          "Password": this.addForm.value['password']
        };
        this.homeService.setIpAddress( this.addForm.value['sysName']);
        this.homeService.getAuthToken(credentials).subscribe(res => {
          console.log(res);
           this.homeService.setAuthHeader(res.headers.get('X-Auth-Token'),res.headers.get('set-cookie'));
        });
    }
    public onRemove() {
       if(this.remove.valid) {
         this.closeModal();
       }
       else {
         this.showWarning = true;
       }
    }

}
