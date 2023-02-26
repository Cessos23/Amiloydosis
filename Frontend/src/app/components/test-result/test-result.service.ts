import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class TestResultService {

  defaultBack = 'http://localhost:3001/api/test_result/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getTestResults(){
    return this.http.get(this.defaultBack+'test_results',{headers: this.headers})
  }

  getTestResult(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'test_result/'+id,{headers: this.headers})
  }


  addTestResult(body:FormData):Observable<any>{
    return this.http.post(this.defaultBack + 'add-testresult', body)
  }

  editTestResult(body:FormData,id: string){
    return this.http.put(this.defaultBack+'edit-testresult/'+ id, body)
  }

  deleteTestResult(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'test_result/'+id,{headers: this.headers})
  }

}
