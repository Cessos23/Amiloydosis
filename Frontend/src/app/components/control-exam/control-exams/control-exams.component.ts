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

import { ControlExamService } from '../control-exam.service';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'app-control-exam',
  templateUrl: './control-exams.component.html',
  styleUrls: ['./control-exams.component.scss']
})
export class ControlExamComponent implements OnInit {
  displayedColumns: string[] = ['id','fullname','exam','actions'];
  dataSource : MedicalHistory[] = [] ;
  dataPatient : Patient[] = [] ;
  //namePatient : Patient[] = [] ;
  _id = '';
  namePatient = "";
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  controlExamService: ControlExamService,private _snackBar: MatSnackBar,private patienService: PatientService) {  }

  ngOnInit(): void {this.get();}

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    this.controlExamService.getControlExams().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openEditModal(id: string) {
    this.controlExamService.getControlExam(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(Modal, {data: {doctor: x}, height: '80%',width: '600px'});
      dialogRef.afterClosed().subscribe(result => {
        this.formGroup = result;
        this.edit();
      });
    })
  }

  add(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.controlExamService.addControlExam(data).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente el examen de control",icon: 'success',confirmButtonText: 'OK'
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
      this.controlExamService.editControlExam(data,this._id).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se actualizo correctamente",icon: 'success',confirmButtonText: 'OK'
        })

        this._id = '';
        //this.formGroup.reset()
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

        this.controlExamService.deleteControlExam(id).subscribe((x) => {
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
  selector: 'control-exams-modal',
  templateUrl: 'control-exams-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  dataSource : Patient[] = [] ;
  _id = "";
  permisos: Permission[] = [];
  examenes: string[] = [];
  constructor(private fb: FormBuilder, private  controlExamService: ControlExamService, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any,private patienService: PatientService) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      id_paciente: [null,Validators.required],
      fullname: ['',Validators.required],
      exam: ['',[Validators.required]],
      date_exam: ['',[Validators.required]],
    });

    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })
    this.examenes = this.controlExamService.getExams();

    if(x){
      const formatedDate = moment(x.birthday, moment.ISO_8601).format("DD/MM/YYYY");
       const dia  = moment(x.date_exam).format('yyyy-MM-DDTHH:mma');

      this.formGroup.setValue({id_paciente:x.id_paciente,fullname: x.fullname,exam: x.exam,date_exam: dia})
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

