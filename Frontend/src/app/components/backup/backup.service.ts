import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from 'src/app/interfaces/service.interface';



@Injectable({
  providedIn: 'root'
})


export class BackupService {

  defaultBack = 'http://localhost:3001/api/';
  headers = { 
    'Content-Type': 'application/json'
  }

  

  constructor(private http: HttpClient) { }


  downloadFile(): any {
		return this.http.get('http://localhost:3001/1676876468909.json', {responseType: 'blob'});
  }
  getBackup(){
    return this.http.get(this.defaultBack+'backup')
  }
  uploadBackup(){
    return this.http.get(this.defaultBack+'restore_backup')
  }


}
