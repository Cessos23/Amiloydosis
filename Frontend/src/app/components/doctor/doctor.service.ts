import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class DoctorService {

  defaultBack = 'http://localhost:3001/api/doctor/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getDoctors(){
    return this.http.get(this.defaultBack+'doctors',{headers: this.headers})
  }

  getDoctor(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'doctor/'+id,{headers: this.headers})
  }


  addDoctor(data: any){
    return this.http.post(this.defaultBack + 'add-doctor', JSON.stringify(data),{headers: this.headers})
  }

  editDoctor(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-doctor/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteDoctor(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'doctor/'+id,{headers: this.headers})
  }

}
