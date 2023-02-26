import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class ClinicalReportService {

  defaultBack = 'http://localhost:3001/api/clinical_report/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getClinicalReports(){
    return this.http.get(this.defaultBack+'clinical_report',{headers: this.headers})
  }

  getClinicalReport(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'clinical_report/'+id,{headers: this.headers})
  }


  addClinicalReport(data: any){
    return this.http.post(this.defaultBack + 'add-clinicalreport', JSON.stringify(data),{headers: this.headers})
  }

  editClinicalReport(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-clinicalreport/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteClinicalReport(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'clinical_report/'+id,{headers: this.headers})
  }

}
