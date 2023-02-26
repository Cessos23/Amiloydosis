import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class ControlExamService {

  defaultBack = 'http://localhost:3001/api/control_exam/';
  headers = { 
    'Content-Type': 'application/json'
  }

  
  public Examenes = ['Electrocardiograma','Holter','Nutrición','Endocrinología'];
  constructor(private http: HttpClient) { }

  
  

  getControlExams(){
    return this.http.get(this.defaultBack+'control_exam',{headers: this.headers})
  }

  getControlExam(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'control_exam/'+id,{headers: this.headers})
  }
  getExams(){
    return this.Examenes;
  }


  addControlExam(data: any){
    return this.http.post(this.defaultBack + 'add-controlexam', JSON.stringify(data),{headers: this.headers})
  }

  editControlExam(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-controlexam/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteControlExam(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'control_exam/'+id,{headers: this.headers})
  }

}
