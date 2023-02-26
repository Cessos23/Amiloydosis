import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class ContractService {

  defaultBack = 'http://localhost:3001/api/contract/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }

  
  

  getContracts(){
    return this.http.get(this.defaultBack+'contracts',{headers: this.headers})
  }

  getContract(id: string): Observable<any>{
    return this.http.get(this.defaultBack+'contract/'+id,{headers: this.headers})
  }


  addContract(data: any){
    return this.http.post(this.defaultBack + 'add-contract', JSON.stringify(data),{headers: this.headers})
  }

  editContract(data: Service,id: string){
    return this.http.put(this.defaultBack+'edit-contract/'+ id, JSON.stringify(data),{headers: this.headers})
  }

  deleteContract(id: string): Observable<any>{
    return this.http.delete(this.defaultBack+'contract/'+id,{headers: this.headers})
  }

}
