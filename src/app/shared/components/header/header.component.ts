import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedAction:string= "";

  getAction(actionName:any){
  this.selectedAction = actionName;
  }

}
