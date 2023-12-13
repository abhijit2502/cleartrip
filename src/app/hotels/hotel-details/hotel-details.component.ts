import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit{

  hotelId:string="";
  hotelDetails:any;
  constructor(private activatedRoute:ActivatedRoute,private http:HttpService){
  let id=this.activatedRoute.snapshot.queryParamMap.get('id');
  if(id!=null){
    this.hotelId=id;
  }
  }

  ngOnInit(){
  this.getHotelDetailsById();
  }

  getHotelDetailsById(){
    const endpoint:string="hotels-details";
    let httpParams = new HttpParams()
                     .set("id",this.hotelId)
    this.http.getDataFromServer(endpoint,httpParams).subscribe((resp:any)=>{
      if(resp && resp.length > 0){
        this.hotelDetails = resp[0];
        console.log(resp);
      }
    })
  }

}
