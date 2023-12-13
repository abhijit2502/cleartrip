import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit{

  searchHotelObj:any={
    city:"",
    checkInDate:null,
    checkOutDate:null,
    rooms:"",
  }
  hotelList:any;
  selectedType:string="";
  hotelListCopy:any;

constructor(private activatedroute:ActivatedRoute,private http:HttpService,private route:Router){
  this.searchHotelObj.city=this.activatedroute.snapshot.queryParamMap.get('city')
  this.searchHotelObj.checkInDate=this.activatedroute.snapshot.queryParamMap.get('checkin')
  this.searchHotelObj.checkOutDate=this.activatedroute.snapshot.queryParamMap.get('checkout')
  this.searchHotelObj.rooms=this.activatedroute.snapshot.queryParamMap.get('rooms')

  console.log("search Hotel obj",this.searchHotelObj);
}

ngOnInit(){
let endpoint="search-hotels";
this.http.getHotelsDataFromServer(endpoint,this.searchHotelObj).subscribe((el:any)=>{
  if(el && el.response && el.response.personalizedSections){
    this.hotelList=el.response.personalizedSections[0].hotels;
    this.hotelListCopy=[...this.hotelList];
    console.log("Hotel",this.hotelListCopy);
  }  
})
}

selectHotel(hotelId:string){
this.route.navigate(['hotels/hotel-details'],{queryParams:{id:hotelId}})
}

sortHotels(type:string){
  this.selectedType=type;
  if(type=='Rating'){
    this.hotelList.sort((a:any,b:any)=>b.reviewSummary.cumulativeRating - a.reviewSummary.cumulativeRating);
  }else if(type=='Price_Highest'){
    this.hotelList.sort((a:any,b:any)=>b.priceDetail.discountedPrice - a.priceDetail.discountedPrice);
  }else if(type=='Price_Lowest'){
    this.hotelList.sort((a:any,b:any)=>a.priceDetail.discountedPrice - b.priceDetail.discountedPrice);
  }
}

getFilterCriteria(filterCriteria:any){
this.filterHotels(filterCriteria);

//multi filter
this.filterHotelsByMultipleAction(filterCriteria)
}

filterHotels(Criteria:any){
 if(Criteria.type=='Rating' && Criteria.isSelected){
 this.hotelList=this.hotelListCopy.filter((el:any)=> el.reviewSummary.cumulativeRating > Criteria.filterValue);
}else if(Criteria.type=='HOTEL_PRICE_BUCKET' && Criteria.isSelected){
  this.hotelList=this.hotelListCopy.filter((el:any)=> el.priceDetail.discountedPrice > Criteria.filterRange.min && el.priceDetail.discountedPrice< Criteria.filterRange.max);
 }else{
  this.hotelList=this.hotelListCopy
 }
}

filterHotelsByMultipleAction(CriteriaArr:any){
  this.hotelList=[];
  var ratingArr:any=[];
  var priceArr:any=[];

  CriteriaArr.forEach((Criteria:any)=>{
   if(Criteria.type=='Rating'){
    ratingArr=this.hotelListCopy.filter((el:any)=> el.reviewSummary.cumulativeRating > Criteria.filterValue);
  }
  if(Criteria.type=='HOTEL_PRICE_BUCKET'){
    priceArr=this.hotelListCopy.filter((el:any)=> el.priceDetail.discountedPrice > Criteria.filterRange.min && el.priceDetail.discountedPrice < Criteria.filterRange.max);
  }
  })

  if(CriteriaArr.length > 0){
    this.hotelList=this.hotelList.concat(ratingArr,priceArr)
  }else{
    this.hotelList=this.hotelListCopy;
  }
}
}
