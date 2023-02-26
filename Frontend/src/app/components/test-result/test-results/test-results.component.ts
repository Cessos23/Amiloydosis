import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Permission } from 'src/app/interfaces/user.interface';
import { PatientService } from '../../patient/patient.service';
import * as moment from 'moment';

import Swal from 'sweetalert2';

import { TestResultService } from '../test-result.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultComponent implements OnInit {
  displayedColumns: string[] = ['id','fullname' ,'namefile','actions'];
  dataSource = [];
  _id = '';
  fileTmp:any;
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  testResultService: TestResultService,private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {this.get(); }

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    this.testResultService.getTestResults().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openEditModal(id: string) {
    this.testResultService.getTestResult(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalEdit, {data: {doctor: x}, height: '80%',width: '600px'});
      dialogRef.afterClosed().subscribe(result => {
        this.formGroup = result;
        this.edit();
      });
    })
  }

  add(){
    this.get();
  }

  edit(){
    this.get();
  }

  delete(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar el doctor?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.testResultService.deleteTestResult(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el usuario",
              icon: 'success',
              confirmButtonText: 'OK'
            })

            this.get();
          }
        })
        
      } 
    })


    
  }

  arrayTo(array: []){
    return array.toString()
  }


}



@Component({
  selector: 'test-results-modal',
  templateUrl: 'test-results-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  public fileTmp:any;
  permisos: Permission[] = [];
  dataSource = [];
  namefl ='';
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder,private  testResultService: TestResultService,private patienService: PatientService, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      id_paciente: ['',[Validators.required]],
      fullname: ['',[Validators.required]],
      namefile: ['',[Validators.required]],
      date_exam: ['',[Validators.required]],
    });
    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })

    if(x){
      const formatedDate = moment(x.birthday, moment.ISO_8601).format("DD/MM/YYYY");
      this.namefl = x.namefile
      this.formGroup.setValue({id_paciente: x.id_paciente,fullname: x.fullname, namefile: x.namefile})
    }

  }
  getFile($event: any): void {
    //TODO esto captura el archivo!
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }
  add(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      const body = new FormData();
      body.append('namefile', this.fileTmp.fileRaw, this.fileTmp.fileName);
      body.append('id_paciente', data.id_paciente);
      body.append('fullname', data.fullname);

      this.testResultService.addTestResult(body).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente el doctor",icon: 'success',confirmButtonText: 'OK'
        })
        this.dialogRef.close();

        this.formGroup.reset();
        this.get()

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    }
  }
  get(){
    this.testResultService.getTestResults().subscribe((x: any) => {
      this.dataSource = x;
    })
  }
  selectChange(any:any){
    this.patienService.getPatient(any.value).subscribe((x:any) =>{
      const nombre = document.getElementById('fullname') as HTMLInputElement ;
      nombre.value = x.name + ' ' + x.lastname+'';
    })
  }
  onNoClick(): void {this.dialogRef.close();}
}



@Component({
  selector: 'test-results-edit-modal',
  templateUrl: 'test-results-edit-modal.html',
})

export class ModalEdit {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  public fileTmp:any;
  permisos: Permission[] = [];
  dataSource = [];
  namefl ='';
  _id = '';
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder,private  testResultService: TestResultService,private patienService: PatientService, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      id_paciente: ['',[Validators.required]],
      fullname: ['',[Validators.required]],
      namefile: ['',[Validators.required]],
      date_exam: ['',[Validators.required]],
    });
    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })

    if(x){
      this._id = x._id;
      this.namefl = x.namefile
      this.formGroup.setValue({id_paciente: x.id_paciente,fullname: x.fullname, namefile: x.namefile,date_exam: x.date_exam})
    }

  }
  getFile($event: any): void {
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }
  }
  edit(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      const body = new FormData();
      body.append('namefile', this.fileTmp.fileRaw, this.fileTmp.fileName);
      body.append('id_paciente', data.id_paciente);
      body.append('fullname', data.fullname);
      body.append('namefilepast', data.namefile);
      this.testResultService.editTestResult(body,this._id).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se actualizo correctamente",icon: 'success',confirmButtonText: 'OK'
        })

        this.get();
        this._id = '';
        this.dialogRef.close();

        this.formGroup.reset();
      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'
        })
      })
    }
  }
  get(){
    this.testResultService.getTestResults().subscribe((x: any) => {
      this.dataSource = x;
    })
  }
  selectChange(any:any){
    this.patienService.getPatient(any.value).subscribe((x:any) =>{
      const nombre = document.getElementById('fullname') as HTMLInputElement ;
      nombre.value = x.name + ' ' + x.lastname+'';
    })
  }
  onNoClick(): void {this.dialogRef.close();}
}

