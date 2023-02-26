import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class PatientService {

  defaultBack = 'http://localhost:3001/api/patient/';
  headers = { 
    'Content-Type': 'application/json'
  }

  public status = ['Aceptado','Rechazado'];
  

  constructor(private http: HttpClient) { }

  
  

  getPatients(){
    return this.http.get(this.defaultBack+'patients',{headers: this.headers})
  }

  getPatient(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'patient/'+id,{headers: this.headers})
  }
  getStatus(){
    return this.status;
  }


  addPatient(data: any){
    return this.http.post(this.defaultBack + 'add-patient', JSON.stringify(data),{headers: this.headers})
  }

  editPatient(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-patient/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deletePatient(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'patient/'+id,{headers: this.headers})
  }

}
