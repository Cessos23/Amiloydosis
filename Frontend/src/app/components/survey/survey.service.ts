import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class SurveyService {

  defaultBack = 'http://localhost:3001/api/survey/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getSurveys(){
    return this.http.get(this.defaultBack+'surveys',{headers: this.headers})
  }

  getSurvey(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'survey/'+id,{headers: this.headers})
  }


  addSurvey(data: any){
    return this.http.post(this.defaultBack + 'add-survey', JSON.stringify(data),{headers: this.headers})
  }

  editSurvey(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-survey/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteSurvey(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'survey/'+id,{headers: this.headers})
  }

}
