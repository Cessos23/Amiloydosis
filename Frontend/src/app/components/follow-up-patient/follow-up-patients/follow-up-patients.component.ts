import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { Appointment } from '../../../interfaces/appointment.interface';

import { AppointmentService } from '../../appointment/appointment.service';
import { ClinicalReportService } from '../../clinical-report/clinical-report.service';
import { PatientService } from '../../patient/patient.service';

import { FollowUpPatientService } from '../follow-up-patient.service';

@Component({
  selector: 'app-follow-up-patients',
  templateUrl: './follow-up-patients.component.html',
  styleUrls: ['./follow-up-patients.component.scss']
})
export class FollowUpPatientComponent implements OnInit {
  displayedColumns: string[] = ['id','name' ,'birthday','phone_number','personal_number','speciality','actions'];
  dataSource = [];
  _id = '';
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  followUpPatientService: FollowUpPatientService,
    private patientService: PatientService,private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {this.get(); }


  get(){
    this.patientService.getPatients().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openCitasModal(id: string) {
    this.patientService.getPatient(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalCitas, {data: {doctor: x}, height: '80%',width: '600px'});
    })
  }
  openInfomreModal(id: string) {
    this.patientService.getPatient(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalInformeClinico, {data: {doctor: x}, height: '80%',width: '600px'});
    })
  }


  arrayTo(array: []){
    return array.toString()
  }


}



@Component({
  selector: 'follow-up-patients-cita-modal',
  templateUrl: 'follow-up-patients-cita-modal.html',
})

export class ModalCitas {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  citaPatient= [];
  displayedColumns: string[] = ['id','title' ,'numero','servicio'];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalCitas>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private appointmentService: AppointmentService) {
    const x = data?data.doctor:null;
    
  

    if(x){
      const myDate = new Date();
      this.appointmentService.getAppointments(myDate).subscribe((a:any) =>{
        this.citaPatient = a.map((c:any) => (c.id_paciente == x._id)?c:'' ).filter((str:any) => str != '')
      })
    }

  }
  onNoClick(): void {this.dialogRef.close();}
}


@Component({
  selector: 'follow-up-patients-informe-modal',
  templateUrl: 'follow-up-patients-informe-modal.html',
})

export class ModalInformeClinico {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  informePatient= [];
  displayedColumns: string[] = ['id','reason_medical','recommendations','past_appointment','infusion'];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalCitas>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private clinicalReportService: ClinicalReportService) {
    const x = data?data.doctor:null;
    
  

    if(x){
      this.clinicalReportService.getClinicalReports().subscribe((ia:any) =>{
       this.informePatient = ia.map((i:any) =>  (i.id_paciente == x._id)?i:'').filter((str:any) => str != '')
      })
      
    }

  }
  

  onNoClick(): void {this.dialogRef.close();}
}

