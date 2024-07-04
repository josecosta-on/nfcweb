import { Component, OnInit } from '@angular/core';
import { slideAnimation } from '@app/animations';
import { BasePage } from '@app/core/layout/base/base.page';
import { SelectComponent } from '@app/core/layout/components/select/select.component';

@Component({
  selector: 'app-wz-location',
  templateUrl: './wz-location.component.html',
  animations:[slideAnimation]
})
export class WzLocationComponent extends BasePage implements OnInit {

  selectedZonesText = '0 items'
  selectedZones:any[] = [];

  zones:any[]=[{
      id:1,
      name:"zona 1"
    },{
      id:2,
      name:"zona 2"
    },{
      id:3,
      name:"zona 3"
    }
  ];

  constructor(){
    super();
    window['wz-location'] = this
  }

  private formatData(data: string[]) {
    if (data.length === 1) {
      const item = this.zones.find((item) => item.name === data[0]);
      return item.name;
    }

    return `${data.length} items`;
  }

  zoneSelectionChanged(items:any) {
    this.ngZone.run(()=>{
      this.selectedZones = items;
      const names = this.selectedZones.map(e=>e.name)
      console.log("names:",names)
      this.selectedZonesText = this.formatData(names);
      console.log("selectedZonesText:",this.selectedZonesText)

      // this.modal.dismiss();
    })
  
  }

  async open(){
    const items = await this.presentModal(SelectComponent,{
      items:this.zones
    })
    console.log("items::",items)
    this.zoneSelectionChanged(items)
  }

  ngOnInit() {
  
    this.initBase()
  }

  next(){
    
    this.router.navigate(['/wizard/done'])
  }
}
