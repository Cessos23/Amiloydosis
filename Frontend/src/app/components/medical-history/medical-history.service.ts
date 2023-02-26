import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class MedicalHistoryService {

  defaultBack = 'http://localhost:3001/api/medical_history/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getMedicalRecords(){
    return this.http.get(this.defaultBack+'medical_history',{headers: this.headers})
  }

  getMedicalHistory(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'medical_history/'+id,{headers: this.headers})
  }


  addMedicalHistory(data: any){
    return this.http.post(this.defaultBack + 'add-medicalhistory', JSON.stringify(data),{headers: this.headers})
  }

  editMedicalHistory(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-medicalhistory/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteMedicalHistory(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'medical_history/'+id,{headers: this.headers})
  }

}
