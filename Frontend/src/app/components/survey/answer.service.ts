import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class AnswerService {

  defaultBack = 'http://localhost:3001/api/answer/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getAnswers(){
    return this.http.get(this.defaultBack+'answers',{headers: this.headers})
  }

  getAnswer(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'answer/'+id,{headers: this.headers})
  }


  addAnswer(data: any){
    return this.http.post(this.defaultBack + 'add-answer', JSON.stringify(data),{headers: this.headers})
  }

  editAnswer(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-answer/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteAnswer(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'answer/'+id,{headers: this.headers})
  }

}
