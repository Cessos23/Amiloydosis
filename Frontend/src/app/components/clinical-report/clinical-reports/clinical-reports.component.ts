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

import { ClinicalReportService } from '../clinical-report.service';
import { PatientService } from '../../patient/patient.service';
import { AppointmentService } from '../../appointment/appointment.service';
import { ControlExamService } from '../../control-exam/control-exam.service';

@Component({
  selector: 'app-clinical-reports',
  templateUrl: './clinical-reports.component.html',
  styleUrls: ['./clinical-reports.component.scss']
})
export class ClinicalReportComponent implements OnInit {
  displayedColumns: string[] = ['id','fullname','hospital_data','past_appointment','analysis','recommendations','infusion','actions'];
  dataSource : MedicalHistory[] = [] ;
  dataPatient : Patient[] = [] ;
  //namePatient : Patient[] = [] ;
  _id = '';
  namePatient = "";
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  clinicalReportService: ClinicalReportService,private _snackBar: MatSnackBar,private patienService: PatientService) {  }

  ngOnInit(): void {this.get();}

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    this.clinicalReportService.getClinicalReports().subscribe((x: any) => {
      this.dataSource = x;
    })
  }


  openEditModal(id: string) {
    this.clinicalReportService.getClinicalReport(id).subscribe((x) => {
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
      this.clinicalReportService.addClinicalReport(data).subscribe((x)=> {
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
      this.clinicalReportService.editClinicalReport(data,this._id).subscribe((x)=> {
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

        this.clinicalReportService.deleteClinicalReport(id).subscribe((x) => {
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
  selector: 'clinical-reports-modal',
  templateUrl: 'clinical-reports-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  dataSource : Patient[] = [] ;
  _id = "";
  permisos: Permission[] = [];
  citaPatient: any [] = [];
  controlExamPatient: any [] = [];
  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private patienService: PatientService,private appointmentService: AppointmentService,private controlExamService: ControlExamService) {
    const x = data?data.doctor:null;
    this.formGroup = this.fb.group({
      id_paciente: [null,Validators.required],
      fullname: ['',Validators.required],
      temperature: ['',[Validators.required]],
      blood_pressure: ['',[Validators.required]],
      glucose: ['',[Validators.required]],
      weight: ['',[Validators.required]],
      hospital_data: ['',[Validators.required]],
      reason_medical: ['',[Validators.required]],
      past_appointment: ['',[Validators.required]],
      analysis: ['',[Validators.required]],
      recommendations: ['',[Validators.required]],
      infusion: ['',[Validators.required]],
    });

    this.patienService.getPatients().subscribe((x: any) => {
      this.permisos = x.map((e:any) => ({text: e.name+' '+e.lastname,value: e._id} ));
      
    })

    if(x){
      this.formGroup.setValue({id_paciente:x.id_paciente,fullname: x.fullname,temperature: x.temperature,blood_pressure: x.blood_pressure
        ,glucose: x.glucose,
        weight: x.weight,hospital_data: x.hospital_data, reason_medical: x.reason_medical,past_appointment: x.past_appointment,
        analysis: x.analysis, recommendations: x.recommendations,infusion: x.infusion })
    }

  }
  selectChange(any:any){
    this.patienService.getPatient(any.value).subscribe((x:any) =>{
      const nombre = document.getElementById('fullname') as HTMLInputElement ;
      nombre.value = x.name + ' ' + x.lastname+'';

      const myDate = new Date();
      this.appointmentService.getAppointments(myDate).subscribe((a:any) =>{
         this.citaPatient = a.map((c:any) => (c.id_paciente == x._id)?c.servicio:'' )
         let uniqueChars = this.citaPatient.filter((element, index) => {
          return this.citaPatient.indexOf(element) === index;
          });
          const citas = uniqueChars.filter((str) => str != '');
          const cita = document.getElementById('citasAnteriores') as HTMLInputElement ;
          cita.value = citas.toString();
      })

      this.controlExamService.getControlExams().subscribe((ce:any) =>{
          this.controlExamPatient = ce.map((e:any) => (e.id_paciente == x._id)?e.exam:'' );
          let uniquecontrol = this.controlExamPatient.filter((element, index) => {
            return this.controlExamPatient.indexOf(element) === index;
            });
            const control = uniquecontrol.filter((str) => str != '');
            const controlanalisis = document.getElementById('analisisAnteriores') as HTMLInputElement ;
            controlanalisis.value = control.toString();
      })
    })
  }
  onNoClick(): void {this.dialogRef.close();}
}

