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
import { ControlExamService } from '../../control-exam/control-exam.service';
import { PatientService } from '../../patient/patient.service';

import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationComponent implements OnInit {
  displayedColumns: string[] = ['id','name' ,'birthday','phone_number','personal_number','speciality','actions'];
  dataSource = [];
  _id = '';
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  notificationService: NotificationService,
    private patientService: PatientService,private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {this.get(); }

  // openAddModal(): void {
  //   const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   this.formGroup = result;
  //   //   this.add();
  //   // });
  // }

  get(){
    this.patientService.getPatients().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openCitasModal(id: string) {
    this.patientService.getPatient(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalCitas, {data: {doctor: x}, height: '80%',width: '600px'});
      // dialogRef.afterClosed().subscribe(result => {
      //   this.formGroup = result;
      //   //this.edit();
      // });
    })
  }
  openInfomreModal(id: string) {
    this.patientService.getPatient(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalControlExam, {data: {doctor: x}, height: '80%',width: '600px'});
      // dialogRef.afterClosed().subscribe(result => {
      //   this.formGroup = result;
      //   //this.edit();
      // });
    })
  }
  openBirthdayModal(id: string) {
    this.patientService.getPatient(id).subscribe((x) => {
      this._id = x._id;
      const dialogRef = this.dialog.open(ModalBirthday, {data: {doctor: x}, height: '80%',width: '600px'});
      // dialogRef.afterClosed().subscribe(result => {
      //   this.formGroup = result;
      //   //this.edit();
      // });
    })
  }

  

  // edit(){
  //   if(this.formGroup.valid){
  //     const data = this.formGroup.getRawValue(); 
  //     this.followUpPatientService.editDoctor(data,this._id).subscribe((x)=> {
  //       Swal.fire({
  //         title: 'Success!',text:  "Se actualizo correctamente",icon: 'success',confirmButtonText: 'OK'
  //       })

  //       this._id = '';
  //       //this.formGroup.reset()
  //       this.get();
  //     },(e) => {
  //       Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'
  //       })
  //     })
  //   }
  // }

  // delete(id: string){

  //   Swal.fire({
  //     title: 'Estas seguro de eliminar el doctor?',
  //     showCancelButton: true,
  //     cancelButtonColor:'#1C92DE',
  //     confirmButtonColor:'#E22020',
  //     confirmButtonText: 'Eliminar',
  //     icon:'warning'
  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       this.followUpPatientService.deleteDoctor(id).subscribe((x) => {
  //         if(x.deletedCount == 1){
  //           Swal.fire({
  //             title: 'Success!',
  //             text:  "Se elimino correctamente el usuario",
  //             icon: 'success',
  //             confirmButtonText: 'OK'
  //           })

  //           this.get();
  //         }
  //       })
        
  //     } 
  //   })


    
  // }

  arrayTo(array: []){
    return array.toString()
  }


}



@Component({
  selector: 'notifications-cita-modal',
  templateUrl: 'notifications-cita-modal.html',
})

export class ModalCitas {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  citaPatient= [];
  displayedColumns: string[] = ['id','title' ,'numero','servicio','actions'];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalCitas>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private appointmentService: AppointmentService,private patientService: PatientService,
  private notificationService: NotificationService) {
    const x = data?data.doctor:null;
    
  

    if(x){
      const myDate = new Date();
      this.appointmentService.getAppointments(myDate).subscribe((a:any) =>{
        this.citaPatient = a.map((c:any) => (c.id_paciente == x._id && moment(c.start).format('yyyy-MM-DD') == moment(myDate).format('yyyy-MM-DD'))?c:'' ).filter((str:any) => str != '')
      })
    }

  }
  onNoClick(): void {this.dialogRef.close();}
  add(id: string){
    this.patientService.getPatient(id).subscribe((x:any) =>{
      var servicio = ""
      var numero = ""
      var fecha = ""
      this.citaPatient.map((c:any) => fecha =moment(c.start).format('DD/MM/yyyy HH:mm'));
      this.citaPatient.map((c:any) => servicio = c.servicio);
      const user  =JSON.parse(localStorage.getItem('user')!);
      this.citaPatient.map((c:any) => numero = c.numero);
      const data ={
        name: x.name +' '+ x.lastname,
        email: x.email,
        fecha: fecha,
        servicio: servicio,
        numero: numero,
        emailfrom: user.email

      }
      this.notificationService.sendEmailCita(data).subscribe((s:any) =>{
        if(s.success == true){
            Swal.fire({
            title: 'Success!',text:  "Se envio correctamente el correo",icon: 'success',confirmButtonText: 'OK'
          })
          this.dialogRef.close(ModalCitas)
        }else{
          Swal.fire({title: 'Error!',text:  s.error ,icon: 'error',confirmButtonText: 'OK'})
        }

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    })
    
  }
}


@Component({
  selector: 'notifications-estudios-modal',
  templateUrl: 'notifications-estudios-modal.html',
})

export class ModalControlExam {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  controlExamPatient= [];
  displayedColumns: string[] = ['id','fullname','exam','actions'];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalCitas>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private controlExamService: ControlExamService,private patientService: PatientService,
  private notificationService: NotificationService) {
    const x = data?data.doctor:null;
    
  

    if(x){
      
      this.controlExamService.getControlExams().subscribe((c:any) =>{
        this.controlExamPatient = c.map((ce:any)=> (ce.id_paciente == x._id)?ce:'').filter((str:any) => str != '');
      })
      
    }

  }
  
  add(id: string){
    this.patientService.getPatient(id).subscribe((x:any) =>{
      var exam = ""
      var numero = ""
      var fecha = ""
      this.controlExamPatient.map((c:any) => exam = c.exam);
      const user  =JSON.parse(localStorage.getItem('user')!);
      const data ={
        name: x.name +' '+ x.lastname,
        email: x.email,
        exam: exam,
        emailfrom: user.email

      }
      this.notificationService.sendEmailControlExam(data).subscribe((s:any) =>{
        if(s.success == true){
            Swal.fire({
            title: 'Success!',text:  "Se envio correctamente el correo",icon: 'success',confirmButtonText: 'OK'
          })
          this.dialogRef.close(ModalControlExam)
        }else{
          Swal.fire({title: 'Error!',text:  s.error ,icon: 'error',confirmButtonText: 'OK'})
        }

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    })
    
  }
  onNoClick(): void {this.dialogRef.close();}
}

@Component({
  selector: 'notifications-birthday-modal',
  templateUrl: 'notifications-birthday-modal.html',
})

export class ModalBirthday {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;
  controlExamPatient= [];
  patient = [];
  displayedColumns: string[] = ['id','name','birthday','actions'];


  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<ModalCitas>,@Inject(MAT_DIALOG_DATA) public data: any
  ,private patientService: PatientService, private notificationService: NotificationService) {
    const x = data?data.doctor:null;
    
  

    if(x){
      
      
      this.patientService.getPatients().subscribe((p:any) =>{
        this.patient = p.map((pa:any) => (pa._id == x._id)?pa:'').filter((str:any) => str != '');
      })
      
    }

  }
  
  add(id: string){
    this.patientService.getPatient(id).subscribe((x:any) =>{
      var exam = ""
      var numero = ""
      var fecha = moment(x.birthday).locale('es-mx').format('LL');
      const user  =JSON.parse(localStorage.getItem('user')!);
      const data ={
        name: x.name +' '+ x.lastname,
        email: x.email,
        fecha: fecha,
        emailfrom: user.email

      }
      this.notificationService.sendEmailUser(data).subscribe((s:any) =>{
        if(s.success == true){
            Swal.fire({
            title: 'Success!',text:  "Se envio correctamente el correo",icon: 'success',confirmButtonText: 'OK'
          })
          this.dialogRef.close(ModalControlExam)
        }else{
          Swal.fire({title: 'Error!',text:  s.error ,icon: 'error',confirmButtonText: 'OK'})
        }

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    })
    
  }
  onNoClick(): void {this.dialogRef.close();}
}

