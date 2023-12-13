import { Component, inject } from '@angular/core';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent {
  city!:[]
  selectedDate!:Date[];
  selRooms:string="";
  checkInDate:any;
  checkoutDate:any;
  roomOptArr:string[]=["1 Room,1 Adults","1 Room,2 Adults","2 Room,4 Adults"]
  
  searchHotel(){
    console.log("selected city",this.city);
    console.log("selected date",this.selectedDate)
  }

  datechange(){
    if(this.selectedDate && this.selectedDate.length == 2){
      this.checkInDate=this.selectedDate[0];
      this.checkoutDate=this.selectedDate[1];
    }
  }
  
  selectedRooms(option:string){
   this.selRooms=option;
  }
}
