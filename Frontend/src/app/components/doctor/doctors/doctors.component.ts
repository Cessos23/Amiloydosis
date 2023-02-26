import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

import Swal from 'sweetalert2';

import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorComponent implements OnInit {
  displayedColumns: string[] = ['id','name' ,'birthday','phone_number','personal_number','speciality','actions'];
  dataSource = [];
  _id = '';
  formGroup!: FormGroup;

  constructor(private dialog: MatDialog , private  doctorService: DoctorService,private _snackBar: MatSnackBar) {  }

  ngOnInit(): void {this.get(); }

  openAddModal(): void {
    const dialogRef = this.dialog.open(Modal, { height: '80%',width: '600px'});
    dialogRef.afterClosed().subscribe(result => {
      this.formGroup = result;
      this.add();
    });
  }

  get(){
    this.doctorService.getDoctors().subscribe((x: any) => {
      this.dataSource = x;
    })
  }

  openEditModal(id: string) {
    this.doctorService.getDoctor(id).subscribe((x) => {
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
      this.doctorService.addDoctor(data).subscribe((x)=> {
        Swal.fire({
          title: 'Success!',text:  "Se guardo correctamente el doctor",icon: 'success',confirmButtonText: 'OK'
        })

        this.formGroup.reset()
        this.get();

      },(e) => {
        Swal.fire({title: 'Error!',text:  e.error ,icon: 'error',confirmButtonText: 'OK'})
      })
    }
  }

  edit(){
    if(this.formGroup.valid){
      const data = this.formGroup.getRawValue(); 
      this.doctorService.editDoctor(data,this._id).subscribe((x)=> {
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
      title: 'Estas seguro de eliminar el doctor?',
      showCancelButton: true,
      cancelButtonColor:'#1C92DE',
      confirmButtonColor:'#E22020',
      confirmButtonText: 'Eliminar',
      icon:'warning'
    }).then((result) => {
      if (result.isConfirmed) {

        this.doctorService.deleteDoctor(id).subscribe((x) => {
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
  selector: 'doctors-modal',
  templateUrl: 'doctors-modal.html',
})

export class Modal {
  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  errorAddEdit= "";
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<Modal>,@Inject(MAT_DIALOG_DATA) public data: any) {
    const x = data?data.doctor:null;
    
    this.formGroup = this.fb.group({
      name: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      birthday: ['',[Validators.required]],
      phone_number: ['',[Validators.required]],
      personal_number: ['',[Validators.required]],
      speciality: ['',[Validators.required]],
      professional_license: ['',[Validators.required]],
      about: ['',[Validators.required]],
      education: ['',[Validators.required]],
      languages: ['',[Validators.required]],
    });

    if(x){
      const dia = moment(x.birthday)

      this.formGroup.setValue({name: x.name,lastname: x.lastname, birthday: dia.format('yyyy-MM-DD'),
        phone_number: x.phone_number,personal_number: x.personal_number,speciality: x.speciality,
        professional_license: x.professional_license,about: x.about,education: x.education,
         languages: x.languages})
    }

  }
  
  onNoClick(): void {this.dialogRef.close();}
}

