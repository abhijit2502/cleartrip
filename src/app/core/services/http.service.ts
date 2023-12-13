import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl:string="http://localhost:3000/";

  httpHeaders:HttpHeaders= new HttpHeaders({
    "content-type":"application/json"
  })

  constructor(private http:HttpClient) { }
  
  getHotelsDataFromServer(endpoint:string,obj:any){
    let httpparam=new HttpParams()
                  .set("city",obj.city)
                  .set("checkInDate",obj.checkInDate)
                  .set("checkOutDate",obj.checkOutDate)
    const url=this.baseUrl+ endpoint;
    return this.http.get(url,{headers:this.httpHeaders,params:httpparam})
  }

  getDataFromServer(endpoint:string,httpParams?:HttpParams){
    const url=this.baseUrl+ endpoint;
    return this.http.get(url,{headers:this.httpHeaders,params:httpParams})
  }

  postDataFromServer(endpoint:string,data:any){
    const url=this.baseUrl+ endpoint;
    return this.http.post(url,data,{headers:this.httpHeaders})
  }

}
