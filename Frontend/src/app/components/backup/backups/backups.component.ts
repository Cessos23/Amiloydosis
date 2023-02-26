import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { saveAs } from 'file-saver';
import * as moment from 'moment';

import Swal from 'sweetalert2';

import { BackupService } from '../backup.service';

@Component({
  selector: 'app-backups',
  templateUrl: './backups.component.html',
  styleUrls: ['./backups.component.scss']
})
export class BackupComponent implements OnInit {
  dataSource = [];
  _id = '';
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  backupService: BackupService,private _snackBar: MatSnackBar) {  }

  ngOnInit(): void { }
  download() {
		this.backupService.downloadFile().subscribe((response: any) => {
			let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
			const url = window.URL.createObjectURL(blob);
			saveAs(blob, 'employees.json');
			}), (error: any) => console.log('Error downloading the file'),
			() => console.info('File downloaded successfully');
	}
  getBackup(){
    this.backupService.getBackup().subscribe((x:any) =>{
      if(x.message == true){
        Swal.fire({
          title: 'Success!',text:  "Respaldo generado correctamente",icon: 'success',confirmButtonText: 'OK'
        })
      }
    })
  }
  uploadBackup(){
    this.backupService.uploadBackup().subscribe((x:any) =>{
      if(x.message == true){
        Swal.fire({
          title: 'Success!',text:  "Respaldo subido correctamente",icon: 'success',confirmButtonText: 'OK'
        })
      }
    })
  }


}
