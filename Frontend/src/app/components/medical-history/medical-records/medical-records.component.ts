import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { MedicalHistory } from 'src/app/interfaces/medical-history.interface';
import { Patient } from 'src/app/interfaces/patient-interface';
import { Permission } from 'src/app/interfaces/user.interface';

import Swal from 'sweetalert2';

import { MedicalHistoryService } from '../medical-history.service';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'app-medical-records',
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.scss']
})
export class MedicalHistoryComponent implements OnInit {
  displayedColumns: string[] = ['id','fullname','actions'];
  dataSource : MedicalHistory[] = [] ;
  dataPatient : Patient[] = [] ;
  _id = '';
  namePatient = "";
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  medicalHistoryService: MedicalHistoryService,private _snackBar: MatSnackBar,private patienService: PatientService) {  }

  ngOnInit(): void {this.get();}

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    this.medicalHistoryService.getMedicalRecords().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openEditModal(id: string) {
    this.medicalHistoryService.getMedicalHistory(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(Modal, {data: {doctor: x}, height: '80%',width: '600px'});
      dialogRef.afterClosed().subscribe(result => {
        this.formGroup = result;
        this.edit();
      });
    })
  }
  openShowModal(id: string) {
    this.medicalHistoryService.getMedicalHistory(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalShow, {data: {doctor: x}, height: '50%',width: '600px'});
    })
  }

  add(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.medicalHistoryService.addMedicalHistory(data).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente el historial clinico",icon: 'success',confirmButtonText: 'OK'
        })

        this.get();
      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    }
  }

  edit(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.medicalHistoryService.editMedicalHistory(data,this._id).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se actualizo correctamente",icon: 'success',confirmButtonText: 'OK'
        })

        this._id = '';
        this.get();
      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'
        })
      })
    }
  }

  delete(id: string){

    Swal.fire({
      title: 'Estas seguro de eliminar el historial clinico?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicalHistoryService.deleteMedicalHistory(id).subscribe((x) => {
          if(x.deletedCount == 1){
            Swal.fire({
              title: 'Success!',
              text:  "Se elimino correctamente el historial clinico",
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
  selector: 'medical-records-modal',
  templateUrl: 'medical-records-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  dataSource : Patient[] = [] ;
  _id = "";
  permisos: Permission[] = [];
  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,private patienService: PatientService) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      id_paciente: [null,Validators.required],
      fullname: ['',Validators.required],
      sex: ['',[Validators.required]],
      occupation: ['',[Validators.required]],
      current_discomforts: ['',[Validators.required]],
      family_history: ['',[Validators.required]],
      personal_history: ['',[Validators.required]],
      physiological_habits: ['',[Validators.required]],
    });

    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })

    if(x){
      this.formGroup.setValue({id_paciente:x.id_paciente,fullname: x.fullname,sex: x.sex,occupation: x.occupation,current_discomforts: x.current_discomforts,
        family_history: x.family_history,personal_history: x.personal_history, physiological_habits: x.physiological_habits})
    }

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
  selector: 'medical-records-show-modal',
  templateUrl: 'medical-records-show-modal.html',
})

export class ModalShow {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  dataSource : Patient[] = [] ;
  _id = "";
  fullname = "";
  sex = "";
  occupation = "";
  current_discomforts = "";
  family_history = ""; 
  personal_history = "" ;
  physiological_habits = "";
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,private patienService: PatientService) {
    const x = data?data.doctor:null;

    if(x){

      this.fullname = x.fullname;
      this.sex = x.sex;
      this.occupation = x.occupation;
      this.current_discomforts = x.current_discomforts;
      this.family_history = x.family_history;
      this.personal_history = x.personal_history;
      this.physiological_habits = x.physiological_habits;


    }

  }

  onNoClick(): void {this.dialogRef.close();}
}
